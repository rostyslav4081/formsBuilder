import { Component, Input } from '@angular/core';
import {JsonFormsAngularService, JsonFormsControl} from '@jsonforms/angular';
import {FormControl} from "@angular/forms";
import {ControlElement} from "@jsonforms/core";


interface UISchemaWithDescription extends ControlElement {
  'ui:description'?: string;
}
@Component({
  selector: 'app-custom-file-input',
  template: `
    <mat-form-field appearance="outline">
      <ngx-mat-file-input [formControl]="control"></ngx-mat-file-input>
      <mat-hint>{{ getHint(uischema) }}</mat-hint>
    </mat-form-field>
  `
})
export class UploaderFilesComponent extends JsonFormsControl {


  @Input()  override uischema!: UISchemaWithDescription;
  @Input() control!: FormControl;
  constructor(service: JsonFormsAngularService) {
    super(service);
  }
  getHint(uischema: UISchemaWithDescription): string | undefined {
    return uischema['ui:description'];
  }

  // schema = {
  //   "type": "object",
  //   "properties": {
  //     "files": {
  //       "type": "array",
  //       "title": "Multiple files",
  //       "items": {
  //         "type": "string",
  //         "format": "data-url"
  //       }
  //     }
  //   }
  // };
  //
  // uischema = {
  //   "files": {
  //     "ui:widget": "file",
  //     "ui:options": {
  //       "accept": ".pdf,.doc,.docx,.txt,image/*"
  //     }
  //   }
  // };
}


