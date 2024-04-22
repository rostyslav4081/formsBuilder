import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { JsonFormsAngularService, JsonFormsControl } from '@jsonforms/angular';
import { and, formatIs, isMultiLineControl, isObjectControl, RankedTester, rankWith, schemaTypeIs, scopeEndsWith } from '@jsonforms/core';
import { FormArray } from '@angular/forms';

interface FileData {
  data: string;
  name: string;
  type: string;
}

@Component({
  selector: 'FileInputRenderer',
  template: `
    <div *ngIf="!hidden" class="input-control">

      <div formArrayName="files">
        <label>{{ label }}</label>

        <input
          type="file"
          (input)="onChange($event)"
          [id]="id"
          *ngIf="!hidden"
          #fileInput
        />
      </div>
      <button pButton label="Vybrat soubor" (click)="fileInputClick()"></button>
      <div *ngFor="let file of filesArray.controls; let i = index">
        <label>{{ file.value.name }}</label>
        <button type="button" (click)="removeFile(i)">Remove</button>
      </div>
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
  @ViewChild('fileInput') fileInputElement?: ElementRef<HTMLInputElement>;

  override data: FileData | undefined;

  constructor(jsonformsService: JsonFormsAngularService) {
    super(jsonformsService);
  }

  get filesArray(): FormArray {
    return this.form.get('files') as FormArray;
  }

  removeFile(index: number) {
    this.filesArray.removeAt(index);
  }

  file2Base64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result?.toString() || '');
      reader.onerror = error => reject(error);
    });
  }

  override async onChange(event: any) {
    const file: File = event.target.files[0];
    console.log('Selected file:', file);

    const data = await this.file2Base64(file);
    const fileData: FileData = { data, name: file.name, type: file.type };
    this.form.setValue(fileData);
    this.data = fileData;

    super.onChange(event);
  }

  override getEventValue = (event: any) => this.data;

  fileInputClick() {
    if (this.fileInputElement) {
      this.fileInputElement.nativeElement.click();
    }
  }
}

export const FileInputPrimeNgRendererTester: RankedTester = rankWith(
  5,
  and(schemaTypeIs('string'), formatIs('file'))
);
