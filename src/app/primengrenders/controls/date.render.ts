import { Component, ChangeDetectionStrategy } from '@angular/core';
import { isDateControl, RankedTester, rankWith } from '@jsonforms/core';
import { JsonFormsAngularService, JsonFormsControl } from '@jsonforms/angular';


@Component({
  selector: 'DateControlRenderer',
  template: `
    <div [ngStyle]="{ display: hidden ? 'none' : '' }" class="input-control">
      <label>{{ label }}</label>


      <p-calendar
        [formControl]="form"
        (input)="onChange($event)"
        [id]="id"
        type="text"
        (focus)="focused = true"
        (focusout)="focused = false"
        styleClass="width-fix"
      >

      </p-calendar>
      <small *ngIf="shouldShowUnfocusedDescription() || focused">{{ description }}</small>
      <small>{{ error }}</small>
    </div>

  `,
  styles: [
    `
      :host ::ng-deep .width-fix {
        display: flex;
      }
      .input-control {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
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
  3,
  isDateControl
);
