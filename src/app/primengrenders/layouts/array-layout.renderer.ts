import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { JsonFormsAngularService, JsonFormsAbstractControl } from '@jsonforms/angular';
import {
  ArrayLayoutProps,
  ArrayTranslations,
  createDefaultValue,
  findUISchema,
  isObjectArrayWithNesting,
  JsonFormsState,
  mapDispatchToArrayControlProps,
  mapStateToArrayLayoutProps,
  OwnPropsOfRenderer,
  Paths,
  RankedTester,
  rankWith,
  setReadonly,
  StatePropsOfArrayLayout,
  UISchemaElement,
  UISchemaTester,
  unsetReadonly,
} from '@jsonforms/core';


@Component({
  selector: 'app-array-layout-renderer',
  template: `
    <div [ngStyle]="{ display: hidden ? 'none' : '' }" class="array-layout">
      <div class="array-layout-toolbar">
        <h2 class="p-h2 array-layout-title">{{ label }}</h2>
        <span></span>
        <span *ngIf="error?.length" class="error-icon">
          <span class="error-badge">{{ error?.length }}</span>
          <span
            class="error-icon-message"
            pTooltip="{{ error }}"
            tooltipPosition="right"
          ></span>
        </span>
        <span></span>
        <button
          pButton
          icon="pi pi-plus"
          *ngIf="isEnabled()"
          (click)="add()"
          label="{{ translations.addTooltip }}"
          disabled="{{ !isEnabled() }}"
        ></button>
      </div>
      <p *ngIf="noData">{{ translations.noDataMessage }}</p>
      <div
        *ngFor="
          let item of data;
          let idx = index;
          trackBy: trackByFn;
          last as last;
          first as first
        "
      >
        <div class="array-item">
          <div class="array-item-content">
            <jsonforms-outlet [renderProps]="getProps(idx)"></jsonforms-outlet>
          </div>
          <div *ngIf="isEnabled()" class="array-item-actions">
            <button
              pButton
              icon="pi pi-arrow-up"
              *ngIf="uischema?.options && uischema.options['showSortButtons'] !== undefined"


              (click)="up(idx)"
              [disabled]="first"
              label="{{ translations.up }}"
              pTooltip="{{ translations.up }}"
              tooltipPosition="right"
            ></button>
            <button
              pButton
              icon="pi pi-arrow-down"
              *ngIf="uischema?.options && uischema.options['showSortButtons'] !== undefined"


              (click)="down(idx)"
              [disabled]="last"
              label="{{ translations.down }}"
              pTooltip="{{ translations.down }}"
              tooltipPosition="right"
            ></button>
            <button
              pButton
              icon="pi pi-times"
              class="p-button-danger"
              (click)="remove(idx)"
              label="{{ translations.removeTooltip }}"
              pTooltip="{{ translations.removeTooltip }}"
              tooltipPosition="right"
            ></button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .array-layout {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      .array-layout > * {
        flex: 1 1 auto;
      }
      .array-layout-toolbar {
        display: flex;
        align-items: center;
      }
      .array-layout-title {
        margin: 0;
      }
      .array-layout-toolbar > span {
        flex: 1 1 auto;
      }
      .array-item {
        padding: 16px;
        display: flex;
        align-items: center;
        gap: 16px;
      }
      .array-item-actions {
        margin-left: auto;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .error-badge {
        background-color: red;
        color: white;
        font-size: 0.75rem;
        padding: 0.25rem;
        border-radius: 50%;
        margin-right: 0.5rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArrayLayoutPrimeNgRenderer
  extends JsonFormsAbstractControl<StatePropsOfArrayLayout>
  implements OnInit, OnDestroy {
  noData!: boolean;
  translations!: ArrayTranslations;
  addItem!: (path: string, value: any) => () => void;
  moveItemUp!: (path: string, index: number) => () => void;
  moveItemDown!: (path: string, index: number) => () => void;
  removeItems!: (path: string, toDelete: number[]) => () => void;
  uischemas!: {
    tester: UISchemaTester;
    uischema: UISchemaElement;
  }[];
  constructor(jsonFormsService: JsonFormsAngularService) {
    super(jsonFormsService);
  }
  mapToProps(state: JsonFormsState): StatePropsOfArrayLayout {
    const props = mapStateToArrayLayoutProps(state, this.getOwnProps());
    return { ...props };
  }
  remove(index: number): void {
    this.removeItems(this.propsPath, [index])();
  }
  add(): void {
    this.addItem(
      this.propsPath,
      createDefaultValue(this.scopedSchema, this.rootSchema)
    )();
  }
  up(index: number): void {
    this.moveItemUp(this.propsPath, index)();
  }
  down(index: number): void {
    this.moveItemDown(this.propsPath, index)();
  }

  override ngOnInit() {
    super.ngOnInit();
    const { addItem, removeItems, moveUp, moveDown } =
      mapDispatchToArrayControlProps(
        this.jsonFormsService.updateCore.bind(this.jsonFormsService)
      );
    this.addItem = addItem;

    this.moveItemUp = moveUp as (path: string, index: number) => () => void;
    this.moveItemDown = moveDown as (path: string, index: number) => () => void;
    this.removeItems = removeItems as (path: string, toDelete: number[]) => () => void;
  }

  override mapAdditionalProps(props: ArrayLayoutProps) {
    this.translations = props.translations;
    this.noData = !props.data || props.data === 0;
    this.uischemas = props.uischemas?.map(entry => ({
      tester: entry.tester,
      uischema: entry.uischema
    })) || [];
  }
  getProps(index: number): OwnPropsOfRenderer {
    const uischema = findUISchema(
      this.uischemas,
      this.scopedSchema,
      this.uischema.scope,
      this.propsPath,
      undefined,
      this.uischema,
      this.rootSchema
    );
    if (this.isEnabled()) {
      unsetReadonly(uischema);
    } else {
      setReadonly(uischema);
    }
    return {
      schema: this.scopedSchema,
      path: Paths.compose(this.propsPath, `${index}`),
      uischema,
    };
  }
  trackByFn(index: number) {
    return index;
  }
}

export const ArrayLayoutPrimeNgRendererTester: RankedTester = rankWith(
  4,
  isObjectArrayWithNesting
);
