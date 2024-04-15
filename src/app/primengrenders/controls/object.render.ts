import isEmpty from 'lodash/isEmpty';
import startCase from 'lodash/startCase';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  JsonFormsAngularService,
  JsonFormsControlWithDetail,
} from '@jsonforms/angular';
import {
  ControlWithDetailProps,
  findUISchema,
  Generate,
  GroupLayout,
  isObjectControl,
  RankedTester,
  rankWith,
  setReadonly,
  UISchemaElement,
} from '@jsonforms/core';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'ObjectRenderer',
  template: `
    <p-card class="object-layout">
      <jsonforms-outlet [uischema]="detailUiSchema" [schema]="scopedSchema" [path]="propsPath"></jsonforms-outlet>
    </p-card>

  `,
  styles: [
    `
      .object-layout {
         padding: 16px;
          border-radius: 4px;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);


      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObjectPrimeNgControlRenderer extends JsonFormsControlWithDetail {
  detailUiSchema!: UISchemaElement;
  constructor(jsonformsService: JsonFormsAngularService) {
    super(jsonformsService);
  }

  override mapAdditionalProps(props: ControlWithDetailProps) {
    this.detailUiSchema = findUISchema(
      props.uischemas || [],
      props.schema,
      props.uischema.scope,
      props.path,
      () => {
        const newSchema = cloneDeep(props.schema);
        // delete unsupported operators
        delete newSchema.oneOf;
        delete newSchema.anyOf;
        delete newSchema.allOf;
        return Generate.uiSchema(
          newSchema,
          'Group',
          undefined,
          this.rootSchema
        );
      },
      props.uischema,
      props.rootSchema
    );
    if (isEmpty(props.path)) {
      this.detailUiSchema.type = 'VerticalLayout';
    } else {
      (this.detailUiSchema as GroupLayout).label = startCase(props.path);
    }
    if (!this.isEnabled()) {
      setReadonly(this.detailUiSchema);
    }
  }
}
export const ObjectPrimeNgControlRendererTester: RankedTester = rankWith(
  2,
  isObjectControl
);
