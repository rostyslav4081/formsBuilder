import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JsonFormsAngularService, JsonFormsControl } from '@jsonforms/angular';
import { isMultiLineControl, RankedTester, rankWith } from '@jsonforms/core';
import {BooleanPrimeNgControlRenderer} from "./boolean.render";

@Component({
  selector: 'ButtonRenderer',
  template: `
    <div [ngStyle]="{ display: hidden ? 'none' : '' }" class="p-field">
      <button pButton type="button" (click)="onClick()">Upload</button>
      <small *ngIf="shouldShowUnfocusedDescription()">{{ description }}</small>
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
export class ButtonPrimeNgRenderer extends JsonFormsControl {

  constructor(jsonformsService: JsonFormsAngularService) {
    super(jsonformsService);
  }

  onClick() {

  }
}

export const ButtonPrimeNgRendererTester: RankedTester = rankWith(
  2,
  (control) => {
    return control.data?.type === 'string' && control.data?.format === 'uri';
  }
);
