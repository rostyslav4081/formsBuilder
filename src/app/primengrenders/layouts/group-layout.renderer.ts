import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { GroupLayout, RankedTester, rankWith, uiTypeIs } from '@jsonforms/core';
import { LayoutRenderer } from './layout.renderer';
import { JsonFormsAngularService } from '@jsonforms/angular';

@Component({
  selector: 'GroupLayoutRenderer',
  template: `
    <p-card
      [ngStyle]="{ 'display': hidden ? 'none' : '' }"
      [class.group-layout]="true"
      [style]="{ 'border': '1px solid' }"
      class="group-layout"
    >
      <ng-template pTemplate="title">
        <div class="custom-headline">{{ label }}</div>
      </ng-template>
      <div
        *ngFor="
      let props of uischema | layoutChildrenRenderProps : schema : path;
      trackBy: trackElement
    "
      >
        <jsonforms-outlet [renderProps]="props"></jsonforms-outlet>
      </div>
    </p-card>

  `,
  styles: [
    `
      .group-layout {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 16px;
      }
      .group-layout > div {
        flex: 1 1 auto;
      }
      .custom-headline {
        font-size: 1.25rem;
        font-weight: 500;
        line-height: 1.6;

      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupLayoutPrimeNgRenderer extends LayoutRenderer<GroupLayout> {
  constructor(
    jsonFormsService: JsonFormsAngularService,
    changeDetectionRef: ChangeDetectorRef
  ) {
    super(jsonFormsService, changeDetectionRef);
  }
}
export const groupLayoutPrimeNgTester: RankedTester = rankWith(1, uiTypeIs('Group'));
