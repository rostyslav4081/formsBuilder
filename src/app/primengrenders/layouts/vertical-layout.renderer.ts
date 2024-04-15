import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import {
  RankedTester,
  rankWith,
  uiTypeIs,
  VerticalLayout,
} from '@jsonforms/core';
import { LayoutRenderer } from './layout.renderer';
import { JsonFormsAngularService } from '@jsonforms/angular';


@Component({
  selector: 'VerticalLayoutRenderer',
  template: `
    <div [ngStyle]="{ display: hidden ? 'none' : '' }" class="vertical-layout">
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
      .vertical-layout {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      .vertical-layout > div {
        flex: 1 1 auto;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerticalLayoutPrimeNgRenderer extends LayoutRenderer<VerticalLayout> {
  constructor(
    jsonFormsService: JsonFormsAngularService,
    changeDetectionRef: ChangeDetectorRef
  ) {
    super(jsonFormsService, changeDetectionRef);
  }
}
export const verticalLayoutPrimeNgTester: RankedTester = rankWith(
  1,
  uiTypeIs('VerticalLayout')
);
