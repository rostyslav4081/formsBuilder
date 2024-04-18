import { Component, ChangeDetectionStrategy } from '@angular/core';
import { isDateControl, RankedTester, rankWith } from '@jsonforms/core';
import { JsonFormsAngularService, JsonFormsControl } from '@jsonforms/angular';


@Component({
  selector: 'DateControlRenderer',
  template: `
    <div [ngStyle]="{ display: hidden ? 'none' : '' }" class="input-control" >
      <label>{{ label }}</label>


      <p-calendar
        [formControl]="form"
        [id]="id"
        type="text"
        (focus)="focused = true"
        (focusout)="focused = false"
        styleClass="width-fix"
        [dateFormat]="'yy-mm-dd'"
        (onSelect)="onSelectDate($event)"
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

  override data: string | undefined;
  focused = false;

  constructor(jsonformsService: JsonFormsAngularService) {
    super(jsonformsService);
  }


  onSelectDate(event: any) {
    const selectedDate: Date = event;
    console.log('Selected date:', selectedDate);

    const formattedDate: string = selectedDate.toISOString().split('T')[0];
    this.form.setValue(new Date(formattedDate));
    this.data = formattedDate;

    this.onChange(event);
  }

  override getEventValue = () => this.data;
}

  export const DatePrimeNgControlRendererTester: RankedTester = rankWith(
  3,
  isDateControl
);
