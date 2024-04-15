import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JsonFormsAngularService, JsonFormsControl } from '@jsonforms/angular';
import { isMultiLineControl, RankedTester, rankWith } from '@jsonforms/core';


@Component({
  selector: 'FileInputRenderer',
  template: `
    <div [ngStyle]="{ display: hidden ? 'none' : '' }" class="p-field">
      <label>{{ label }}</label>
      <input
        type="file"
        pFileUpload
        (onSelect)="onFileSelect($event)"
        [id]="id"
        [formControl]="form"
        (focus)="focused = true"
        (focusout)="focused = false"
      />
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
  2,
  (control) => control.data.type === 'string' && control.data.format === 'uri'
);
