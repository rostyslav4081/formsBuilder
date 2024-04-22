import { Component, OnInit } from '@angular/core';
import { JsonFormsAngularService, JsonFormsArrayControl } from '@jsonforms/angular';
import {
  ArrayControlProps,
  ArrayTranslations,
  ControlElement,
  createDefaultValue,
  deriveTypes,
  encode,
  isObjectArrayControl,
  isPrimitiveArrayControl,
  JsonSchema,
  mapDispatchToArrayControlProps,
  or,
  OwnPropsOfRenderer,
  Paths,
  RankedTester,
  rankWith,
  setReadonly,
  UISchemaElement,
} from '@jsonforms/core';
import startCase from "lodash/startCase";

@Component({
  selector: 'TableRenderer',
  template: `
    <p-table [value]="data" [styleClass]="'mat-elevation-z8'">
      <ng-template pTemplate="header">
        <tr>
          <th>
            <button pButton type="button" icon="pi pi-plus" class="p-button-primary"
                    (click)="add()" [disabled]="!isEnabled()" pTooltip="{{translations.addTooltip}}"
                    tooltipPosition="top"></button>
          </th>
        </tr>
      </ng-template>
      <ng-template pTemplate="body" let-row let-i="rowIndex" let-first="first" let-last="last">
        <tr>
          <td>
            <button *ngIf="uischema?.options?.['showSortButtons']" pButton type="button" icon="pi pi-arrow-up"
                    class="p-button-success item-up"
                    (click)="up(i)" [disabled]="first" pTooltip="{{translations.upAriaLabel}}"
                    tooltipPosition="right"></button>
            <button *ngIf="uischema?.options?.['showSortButtons']" pButton type="button" icon="pi pi-arrow-down"
                    class="p-button-info item-down"
                    (click)="down(i)" [disabled]="last" pTooltip="{{translations.downAriaLabel}}"
                    tooltipPosition="right"></button>

            <button pButton type="button" icon="pi pi-trash" class="p-button-danger"
                    (click)="remove(i)" [disabled]="!isEnabled()" pTooltip="{{translations.removeTooltip}}"
                    tooltipPosition="right"></button>
          </td>
          <td *ngFor="let item of items">
            <jsonforms-outlet [renderProps]="getProps(i, item.props)"></jsonforms-outlet>
          </td>
        </tr>
      </ng-template>
      <ng-template pTemplate="header" let-columns>
        <tr>
          <th *ngFor="let col of columns">{{ col.header }}</th>
        </tr>
      </ng-template>
    </p-table>


  `,
  styles: ['table {width: 100%;}', '.cdk-column-action { width: 15%}'],
})
export class TablePrimeNgRenderer extends JsonFormsArrayControl implements OnInit {
  detailUiSchema!: UISchemaElement;
  displayedColumns!: string[];
  items!: ColumnDescription[];
  readonly columnsToIgnore = ['array', 'object'];
  addItem!: (path: string, value: any) => () => void;
  moveItemUp!: (path: string, index: number) => () => void;
  moveItemDown!: (path: string, index: number) => () => void;
  removeItems!: (path: string, toDelete: number[]) => () => void;
  translations!: ArrayTranslations;

  constructor(jsonformsService: JsonFormsAngularService) {
    super(jsonformsService);
  }

  override  ngOnInit() {
    super.ngOnInit();

    const { addItem, removeItems, moveUp, moveDown } =
      mapDispatchToArrayControlProps(
        this.jsonFormsService.updateCore.bind(this.jsonFormsService)
      );
    this.addItem = addItem || (() => () => {});
    this.moveItemUp = moveUp || (() => () => {});
    this.moveItemDown = moveDown || (() => () => {});
    this.removeItems = removeItems || (() => () => {});
  }

  trackElement(index: number, _element: any) {
    return index ? index : null;
  }

  override mapAdditionalProps(props: ArrayControlProps) {
    this.items = this.generateCells(props.schema, props.path);
    this.displayedColumns = this.items.map((item) => item.property);
    if (this.isEnabled()) {
      this.displayedColumns.push('action');
    }
    this.translations = props.translations;
  }

  getProps(index: number, props: OwnPropsOfRenderer): OwnPropsOfRenderer {
    const rowPath = props.path !== undefined ? Paths.compose(props.path, `${index}`) : '';
    return {
      schema: props.schema,
      uischema: props.uischema,
      path: rowPath,
    };
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

  generateCells = (
    schema: JsonSchema,
    rowPath: string
  ): ColumnDescription[] => {
    if (schema.type === 'object') {
      return this.getValidColumnProps(schema).map((prop) => {
        const encProp = encode(prop);
        const uischema = controlWithoutLabel(`#/properties/${encProp}`);
        if (!this.isEnabled()) {
          setReadonly(uischema);
        }
        return {
          property: prop,
          header: startCase(prop),
          props: {
            schema: schema,
            uischema,
            path: rowPath,
          },
        };
      });
    }

    return [
      {
        property: 'DUMMY',
        header: this.label,
        props: {
          schema: schema,
          uischema: controlWithoutLabel(`#`),
          path: rowPath,
        },
      },
    ];
  };


  getValidColumnProps = (scopedSchema: JsonSchema) => {
    if (scopedSchema.type === 'object' && scopedSchema.properties !== undefined) {

      const properties = scopedSchema.properties;
      return Object.keys(properties).filter((prop) => {
        const types = deriveTypes(properties[prop]);
        if (types.length > 1) {
          return false;
        }
        return this.columnsToIgnore.indexOf(types[0]) === -1;
      });
    }

    return [''];
  };


}

export const TablePrimeNgRendererTester: RankedTester = rankWith(
  3,
  or(isObjectArrayControl, isPrimitiveArrayControl)
);

interface ColumnDescription {
  property: string;
  header: string;
  props: OwnPropsOfRenderer;
}

export const controlWithoutLabel = (scope: string): ControlElement => ({
  type: 'Control',
  scope: scope,
  label: false,
});
