import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  JsonFormsAngularService,
  JsonFormsBaseRenderer,
} from '@jsonforms/angular';
import {
  JsonFormsState,
  LabelElement,
  mapStateToLabelProps,
  OwnPropsOfLabel,
  RankedTester,
  rankWith,
  uiTypeIs,
} from '@jsonforms/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'LabelRenderer',
  template: ` <label class="custom-headline size-{{ size }}">{{ label }}</label> `,
  styles: [
    `
      :host {
        flex: 1 1 auto;
      }
      .custom-headline {
        font-size: 1.25rem;
        font-weight: 500;
      }
      .custom-headline.size-small {
        font-size: 1rem;
        font-weight: normal;
      }
    `,
  ],

})
export class LabelPrimeNgRenderer  extends JsonFormsBaseRenderer<LabelElement>
  implements OnDestroy, OnInit
{
  label!: string;
  visible!: boolean;
  size: 'default' | 'small' = 'default';

  private subscription: Subscription | undefined;

  constructor(private jsonFormsService: JsonFormsAngularService) {
    super();
  }
  ngOnInit() {
    this.subscription = this.jsonFormsService.$state.subscribe({
      next: (state: JsonFormsState) => {
        const props = mapStateToLabelProps(
          state,
          this.getOwnProps() as OwnPropsOfLabel
        );
        this.visible = props.visible;
        this.label = props.text;
        this.size = this.uischema.options?.['size'] ?? 'default';
      },
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

export const LabelPrimeNgRendererTester: RankedTester = rankWith(5, uiTypeIs('Label'));
