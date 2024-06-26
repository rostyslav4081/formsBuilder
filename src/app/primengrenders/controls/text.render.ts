import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JsonFormsAngularService, JsonFormsControl } from '@jsonforms/angular';
import { isStringControl, RankedTester, rankWith } from '@jsonforms/core';
import {error} from "protractor";


@Component({
  selector: 'TextControlRenderer',
  template: `
    <div [ngStyle]="{ display: hidden ? 'none' : '' }" class="input-control">
      <label>{{ label }}</label>
      <input
        type="{{ getType() }}"
        pInputText
        (input)="onChange($event)"
        [id]="id"
        [formControl]="form"
        (focus)="focused = true"
        (focusout)="focused = false"
      />
      <small *ngIf="description && (shouldShowUnfocusedDescription() || focused)">{{ description }}</small>
      <small>{{ error}}</small>
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
export class TextPrimeNgControlRenderer extends JsonFormsControl {
  focused = false;
  constructor(jsonformsService: JsonFormsAngularService) {
    super(jsonformsService);
  }

  override getEventValue = (event: any) => event.target.value || undefined;
  getType = (): string => {
    if (this.uischema.options && this.uischema.options['format']) {
      return this.uischema.options['format'];
    }
    if (this.scopedSchema && this.scopedSchema['format']) {
      switch (this.scopedSchema['format']) {
        case 'email':
          return 'email';
        case 'tel':
          return 'tel';
        default:
          return 'text';
      }
    }
    return 'text';
  };
}
export const TextPrimeNgControlRendererTester: RankedTester = rankWith(
  2,
  isStringControl
);
