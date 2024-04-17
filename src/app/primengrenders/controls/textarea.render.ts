import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JsonFormsAngularService, JsonFormsControl } from '@jsonforms/angular';
import { isMultiLineControl, RankedTester, rankWith } from '@jsonforms/core';


@Component({
  selector: 'TextAreaRenderer',
  template: `
    <div [ngStyle]="{ display: hidden ? 'none' : '' }" class="input-control">
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
      .input-control {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
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
  5,
  isMultiLineControl
);
