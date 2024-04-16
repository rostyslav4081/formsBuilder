import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewRef,
} from '@angular/core';
import { JsonFormsAngularService, JsonFormsControl } from '@jsonforms/angular';
import { isBooleanControl, RankedTester, rankWith } from '@jsonforms/core';

@Component({
  selector: 'BooleanControlRenderer',
  template: `
    <div [ngStyle]="{ display: hidden ? 'none' : '' }" class="boolean-control">
      <div class="labelNG">
        <p-checkbox
          binary="true"
          (onChange)="onChange($event)"
          [ngModel]="isChecked()"
          [disabled]="!isEnabled()"
          [id]="id"
        >

        </p-checkbox>
        {{ label }}</div>
      <small *ngIf="shouldShowUnfocusedDescription()" class="mat-caption">{{ description }}</small>
      <small class="mat-caption">{{ error }}</small>
    </div>

  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: row;
      }
      .boolean-control {
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
      }
      .labelNG{
        flex: 1 1 auto;
        display: flex;
        flex-direction: row;
        gap: 1rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooleanPrimeNgControlRenderer extends JsonFormsControl {
  constructor(
    jsonformsService: JsonFormsAngularService,
    private changeDetectionRef: ChangeDetectorRef
  ) {
    super(jsonformsService);
  }
  isChecked = () => this.data || false;
  override getEventValue = (event: any) => event.checked;

  override mapAdditionalProps() {
    if (!(this.changeDetectionRef as ViewRef).destroyed) {
      this.changeDetectionRef.markForCheck();
    }
  }
}

export const booleanPrimeNgControlTester: RankedTester = rankWith(2, isBooleanControl);
