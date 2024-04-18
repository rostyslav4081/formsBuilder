import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JsonFormsAngularService, JsonFormsControl } from '@jsonforms/angular';
import {and, formatIs, isMultiLineControl, RankedTester, rankWith, schemaTypeIs, scopeEndsWith} from '@jsonforms/core';


@Component({
  selector: 'FileInputRenderer',
  template: `
    <div [ngStyle]="{ display: hidden ? 'none' : '' }" class="input-control">
      <label>{{ label }}</label>

      <!-- <p-fileUpload
        (focus)="focused = true"
        (focusout)="focused = false"
        [id]="id"
        [formControl]="form"
        (onSelect)="onFileSelect($event)"

        [auto]="true"

      >
      </p-fileUpload> -->

      <!-- TODO: https://dev.to/faddalibrahim/how-to-create-a-custom-file-upload-button-using-html-css-and-javascript-1c03 -->
      <input
        type="file"
        (input)="onChange($event)"
        [id]="id"
        [formControl]="form"
        hidden
        #fileInput
      />
      <button pButton label="Vybrat soubor" (click)="fileInput.click()"></button>

      <small *ngIf="shouldShowUnfocusedDescription() || focused">{{ description }}</small>
      <small>{{ error }}</small>
    </div>

  `,
  styles: [
    `
       .input-control {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
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
  // file2Base64(file: File): Promise<string> {
  //   return new Promise<string>((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result?.toString() || '');
  //     reader.onerror = error => reject(error);
  //   });
  // }
  override onChange(event: any) {
    const file: File = event.target.files[0];
    console.log(event.target);
    console.log('Selected file:', file);
  //
  //
  //   this.file2Base64(file)
  //     .then(base64String => {
  //       console.log('Base64 representation of the file:', base64String);
  //
  //     })
  //     .catch(error => {
  //       console.error('An error occurred while converting file to base64:', error);
  //     });
  }

  override getEventValue = (event: any) => event.target.value || undefined;
}

export const FileInputPrimeNgRendererTester: RankedTester = rankWith(
  5,
  and(schemaTypeIs('string'),  scopeEndsWith('fileUpload'))
);
