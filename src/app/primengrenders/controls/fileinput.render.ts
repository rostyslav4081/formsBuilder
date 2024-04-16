import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JsonFormsAngularService, JsonFormsControl } from '@jsonforms/angular';
import {and, formatIs, isMultiLineControl, RankedTester, rankWith, schemaTypeIs} from '@jsonforms/core';


@Component({
  selector: 'FileInputRenderer',
  template: `
    <div [ngStyle]="{ display: hidden ? 'none' : '' }" class="p-field">
      <label>{{ label }}</label>

      <p-fileUpload
        (focus)="focused = true"
        (focusout)="focused = false"
        [id]="id"
        [formControl]="form"
        (onSelect)="onFileSelect($event)"

        [auto]="true"

      >

      </p-fileUpload>
      <small *ngIf="shouldShowUnfocusedDescription() || focused">{{ description }}</small>
      <small>{{ error }}</small>
    </div>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: row;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileInputPrimeNgRenderer extends JsonFormsControl {
  focused = false;

  constructor(jsonformsService: JsonFormsAngularService) {
    super(jsonformsService);
  }

  onFileSelect(event: any) {
    const fileList: FileList = event.files;

  }

  override getEventValue = (event: any) => event.target.value || undefined;
}

export const FileInputPrimeNgRendererTester: RankedTester = rankWith(
  5,
  and(schemaTypeIs('string'), formatIs('file'))
);
