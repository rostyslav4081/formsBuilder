import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JsonFormsAngularService, JsonFormsControl } from '@jsonforms/angular';
import { isMultiLineControl, RankedTester, rankWith } from '@jsonforms/core';


@Component({
  selector: 'TextAreaRenderer',
  template: `
    <div [ngStyle]="{ display: hidden ? 'none' : '' }" class="p-field">
      <label>{{ label }}</label>
      <textarea
        pInputTextarea
        (input)="onChange($event)"
        [id]="id"
        [formControl]="form"
        (focus)="focused = true"
        (focusout)="focused = false"
      ></textarea>
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
export class TextAreaPrimeNgRenderer extends JsonFormsControl {
  focused = false;
  constructor(jsonformsService: JsonFormsAngularService) {
    super(jsonformsService);
  }

  override getEventValue = (event: any) => event.target.value || undefined;
}
export const TextAreaPrimeNgRendererTester: RankedTester = rankWith(
  2,
  isMultiLineControl
);
