import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JsonFormsAngularService, JsonFormsControl } from '@jsonforms/angular';
import {and, formatIs, isMultiLineControl, isObjectControl, RankedTester, rankWith, schemaTypeIs, scopeEndsWith} from '@jsonforms/core';

interface FileData {
  data: string;
  name: string;
  type: string;
}

@Component({
  selector: 'FileInputRenderer',
  template: `
    <div [ngStyle]="{ display: hidden ? 'none' : '' }" class="input-control">

      <label>{{ label }}</label>

      <input
        type="file"
        (input)="onChange($event)"
        [id]="id"
        hidden
        #fileInput
      />
      <button pButton label="Vybrat soubor" (click)="fileInput.click()"></button>
      <small *ngIf="selectedFileName" style="text-align: center;">Vybrán soubor: {{ selectedFileName }}</small>
      <small *ngIf="size" style="text-align: center;">Velikost: {{ size + 'mB' }}</small>
      <small *ngIf="shouldShowUnfocusedDescription() || focused">{{ description }}</small>
      <small>{{ error }}</small>
<!--      <p-fileUpload name="demo[]" url="https://www.primefaces.org/cdn/api/upload.php" (onUpload)="onChange($event)" [multiple]="true" accept="image/*" maxFileSize="1000000">-->
<!--        <ng-template pTemplate="content">-->
<!--          <ul *ngIf="uploadedFiles.length">-->
<!--            <li *ngFor="let file of uploadedFiles">{{ file.name }} - {{ file.size }} bytes</li>-->
<!--          </ul>-->
<!--        </ng-template>-->
<!--      </p-fileUpload>-->
<!--            <small *ngIf="shouldShowUnfocusedDescription() || focused">{{ description }}</small>-->
<!--            <small>{{ error }}</small>-->
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
  // uploadedFiles: File[] = [];
  size!:string;
  selectedFileName!: string;
  override data: FileData | undefined;

  constructor(jsonformsService: JsonFormsAngularService) {
    super(jsonformsService);

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
    this.selectedFileName = file.name;
    this.size = (event.target.files[0].size / 1048576).toFixed(2);

    console.log(this.selectedFileName);
    console.log('Selected file:', file);

    const data = await this.file2Base64(file);
    const fileData: FileData = { data, name: file.name, type: file.type };
    this.form.setValue(fileData);
    this.data = fileData;

    super.onChange(event);
  }

  override getEventValue = (event: any) => this.data;
}

export const FileInputPrimeNgRendererTester: RankedTester = rankWith(
  5,
  and(schemaTypeIs('string'), formatIs('file'))
);
