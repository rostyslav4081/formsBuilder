import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import {
  HorizontalLayout,
  RankedTester,
  rankWith,
  uiTypeIs,
} from '@jsonforms/core';
import { LayoutRenderer } from './layout.renderer';
import { JsonFormsAngularService } from '@jsonforms/angular';



@Component({
  selector: 'HorizontalLayoutPrimeNgRenderer',
  template: `
    <div
      [ngStyle]="{ display: hidden ? 'none' : '' }"
      class="horizontal-layout"
    >
      <div
        *ngFor="
          let props of uischema | layoutChildrenRenderProps : schema : path;
          trackBy: trackElement
        "
      >
        <jsonforms-outlet [renderProps]="props"></jsonforms-outlet>
      </div>
    </div>
  `,
  styles: [
    `
      .horizontal-layout {
        display: flex;
        gap: 16px;
        flex-flow: row wrap;
        align-items: flex-start;
        place-content: flex-start center;
      }
      .horizontal-layout > div {
        flex: 1 1 auto;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HorizontalLayoutPrimeNgRenderer extends LayoutRenderer<HorizontalLayout> {
  constructor(
    jsonFormsService: JsonFormsAngularService,
    changeDetectionRef: ChangeDetectorRef
  ) {
    super(jsonFormsService, changeDetectionRef);
  }

  override readonly hidden: any;

}
export const horizontalLayoutPrimeNgTester: RankedTester = rankWith(
  1,
  uiTypeIs('HorizontalLayout')
);
