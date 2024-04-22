import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { JsonFormsAngularService, JsonFormsArrayControl } from '@jsonforms/angular';
import { ArrayControlProps, ArrayTranslations, ControlElement, createDefaultValue, decode, findUISchema, getFirstPrimitiveProp, JsonFormsState, mapDispatchToArrayControlProps, mapStateToArrayControlProps, RankedTester, rankWith, setReadonly, StatePropsOfArrayControl, uiTypeIs } from '@jsonforms/core';
import {get} from "node:http";

const keywords = ['#', 'properties', 'items'];

export const removeSchemaKeywords = (path: string) => {
  return decode(
    path
      .split('/')
      .filter((s) => !keywords.some((key) => key === s))
      .join('.')
  );
};

@Component({
  selector: 'jsonforms-list-with-detail-master',
  template: `
    <p-splitter orientation="horizontal" [style.height.%]="100">
      <div>
        <p-listbox [options]="masterItems" [(ngModel)]="selectedItem" optionLabel="label">
          <ng-template let-item let-itemIndex="index" pTemplate="item">
            <div [class.selected]="item === selectedItem"
                 (click)="onSelect(item, itemIndex)"
                 (mouseover)="onListItemHover(itemIndex)"
                 (mouseout)="onListItemHover(undefined)">
              <span>{{ item.label || 'No label set' }}</span>
              <button pButton type="button"
                      icon="pi pi-trash"
                      class="button item-button hide"
                      (click)="onDeleteClick(itemIndex)"
                      [ngClass]="{ 'show': highlightedIdx == itemIndex }"
                      *ngIf="isEnabled()">
              </button>
            </div>
          </ng-template>
        </p-listbox>
        <button pButton type="button" icon="pi pi-plus" class="add-button" (click)="onAddClick()" *ngIf="isEnabled()">
          <span [attr.aria-label]="translations.addAriaLabel">Add</span>
        </button>
      </div>
      <div class="content">
        <jsonforms-detail *ngIf="selectedItem" [item]="selectedItem"></jsonforms-detail>
      </div>
    </p-splitter>

  `,
  styles: [
    `
      /* TODO: The following rule targets internal classes of list that may no longer apply for the PrimeNG version. */
      .ui-listbox-list .ui-listbox-item.selected {
        background: rgba(0, 0, 0, 0.04);
      }
      .container {
        height: 100vh;
      }
      .content {
        padding: 15px;
        background-color: #fff;
      }
      .add-button {
        float: right;
        margin-top: 0.5em;
        margin-right: 0.25em;
      }
      .button {
        float: right;
        margin-right: 0.25em;
      }
      .item-button {
        position: absolute;
        top: 0;
        right: 0;
      }
      .show {
        display: inline-block;
      }
      p-splitter {
        width: 100%;
        height: 100%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MasterListPrimeNgComponent extends JsonFormsArrayControl implements OnInit {
  masterItems!: any[];
  selectedItem: any;
  selectedItemIdx!: number;
  addItem!: (path: string, value: any) => () => void;
  removeItems!: ((path: string, toDelete: number[]) => () => void) | undefined;
  highlightedIdx!: number;
  translations!: ArrayTranslations;

  constructor(jsonformsService: JsonFormsAngularService, private changeDetectorRef: ChangeDetectorRef) {
    super(jsonformsService);
  }

  onListItemHover(idx: number) {
    this.highlightedIdx = idx;
  }

  trackElement(_index: number, element: any) {
    return element ? element.label : null;
  }

   override ngOnInit() {
    super.ngOnInit();
    const dispatch = this.jsonFormsService.updateCore.bind(this.jsonFormsService);
    const { addItem, removeItems } = mapDispatchToArrayControlProps(dispatch);
    this.addItem = addItem;
    this.removeItems = removeItems;
  }

  override mapAdditionalProps(props: ArrayControlProps) {
    const { data, path, schema, uischema } = props;
    const controlElement = uischema as ControlElement;
    this.propsPath = props.path;

    // Check if uischemas is defined before passing it to findUISchema
    const detailUISchema = findUISchema(
      props.uischemas ? props.uischemas : [],
      schema,
      `${controlElement.scope}/items`,
      props.path,
      'VerticalLayout',
      controlElement,
      props.rootSchema
    );

    if (!this.isEnabled()) {
      setReadonly(detailUISchema);
    }

    this.translations = props.translations;

    const masterItems = (data || []).map((d: any, index: number) => {
      const labelRefInstancePath = controlElement.options?.['labelRef'] && removeSchemaKeywords(controlElement.options['labelRef']);
      const isPrimitive = d !== undefined && typeof d !== 'object';
      const masterItem = {
        label: isPrimitive ? d.toString() : get(d, labelRefInstancePath ?? getFirstPrimitiveProp(schema)),
        data: d,
        path: `${path}.${index}`,
        schema,
        uischema: detailUISchema,
      };
      return masterItem;
    });
    this.masterItems = masterItems;
    let newSelectedIdx = -1;
    let newSelectedItem;
    if (this.masterItems.length === 0) {
      // unset select if no elements anymore
      this.selectedItem = undefined;
      this.selectedItemIdx = -1;
    } else if (this.selectedItemIdx >= this.masterItems.length) {
      // the previous index is too high, reduce it to the maximal possible
      newSelectedIdx = this.masterItems.length - 1;
      newSelectedItem = this.masterItems[newSelectedIdx];
    } else if (this.selectedItemIdx !== -1 && this.selectedItemIdx < this.masterItems.length) {
      newSelectedIdx = this.selectedItemIdx;
      newSelectedItem = this.masterItems[this.selectedItemIdx];
    }

    if (newSelectedItem !== undefined && this.selectedItem !== undefined &&
      (newSelectedItem.label === this.selectedItem.label || newSelectedItem.path === this.selectedItem.path)) {
      // after checking that we are on the same path, set selection
      this.selectedItem = newSelectedItem;
      this.selectedItemIdx = newSelectedIdx;
    } else if (this.masterItems.length > 0) {
      // pre-select 1st entry if the previous selected element as fallback
      this.selectedItem = this.masterItems[0];
      this.selectedItemIdx = 0;
    }
    this.changeDetectorRef.markForCheck();
  }


  onSelect(item: any, idx: number): void {
    this.selectedItem = item;
    this.selectedItemIdx = idx;
  }

  onAddClick() {
    this.addItem(this.propsPath, createDefaultValue(this.scopedSchema, this.rootSchema))();
  }

  onDeleteClick(item: number) {
    if (this.removeItems) {
      this.removeItems(this.propsPath, [item])();
    } else {
      console.error("removeItems is undefined");
    }
  }


  protected override mapToProps(state: JsonFormsState): StatePropsOfArrayControl {
    const props = mapStateToArrayControlProps(state, this.getOwnProps());
    return { ...props };
  }
}

export const masterDetailPrimeNgTester: RankedTester = rankWith(4, uiTypeIs('ListWithDetail'));
