import { Component, ChangeDetectionStrategy } from '@angular/core';
import { isDateControl, RankedTester, rankWith } from '@jsonforms/core';
import { JsonFormsAngularService, JsonFormsControl } from '@jsonforms/angular';


@Component({
  selector: 'DateControlRenderer',
  template: `
    <div [ngStyle]="{ display: hidden ? 'none' : '' }" class="p-field">
      <label>{{ label }}</label>
      <input
        type="text"
        pInputText
        (input)="onChange($event)"
        [id]="id"
        [formControl]="form"

        (focus)="focused = true"
        (focusout)="focused = false"
      />
      <button
        pButton
        type="button"
        icon="pi pi-calendar"
        [pTooltip]="'Select Date'"
        [tooltipPosition]="'bottom'"
        (click)="datepicker.toggle()"
      ></button>
      <p-calendar #datepicker></p-calendar>
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
export class DatePrimeNgControlRenderer extends JsonFormsControl {
  focused = false;

  constructor(jsonformsService: JsonFormsAngularService) {
    super(jsonformsService);
  }

  override getEventValue = (event: any) => event.value.toISOString().substr(0, 10);
}

export const DatePrimeNgControlRendererTester: RankedTester = rankWith(
  2,
  isDateControl
);
