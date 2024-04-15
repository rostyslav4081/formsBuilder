import {
  OnDestroy,
  OnInit,
  ChangeDetectorRef,
  Component,
  PipeTransform,
  Pipe,
} from '@angular/core';
import {
  JsonFormsAngularService,
  JsonFormsBaseRenderer,
} from '@jsonforms/angular';
import {
  JsonFormsState,
  Layout,
  mapStateToLayoutProps,
  OwnPropsOfRenderer,
  UISchemaElement,
  JsonSchema,
} from '@jsonforms/core';
import type { Subscription } from 'rxjs';

@Component({
  template: '',
})
export class LayoutRenderer<T extends Layout>
  extends JsonFormsBaseRenderer<T>
  implements OnInit, OnDestroy
{
  hidden!: boolean;
  label: string | undefined;
  private subscription: Subscription | undefined;

  constructor(
    private jsonFormsService: JsonFormsAngularService,
    protected changeDetectionRef: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    this.subscription = this.jsonFormsService.$state.subscribe({
      next: (state: JsonFormsState) => {
        const props = mapStateToLayoutProps(state, this.getOwnProps());
        this.label = props.label;
        this.hidden = !props.visible;
        this.changeDetectionRef.markForCheck();
      },
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  trackElement(_index: number, renderProp: OwnPropsOfRenderer): string {
    return renderProp
      ? renderProp.path + JSON.stringify(renderProp.uischema)
      : "";
  }

}

@Pipe({ name: 'layoutChildrenRenderProps' })
export class LayoutChildrenRenderPropsPipe implements PipeTransform {
  transform(
    uischema: Layout,
    schema: JsonSchema,
    path: string
  ): OwnPropsOfRenderer[] {
    const elements = (uischema.elements || []).map((el: UISchemaElement) => ({
      uischema: el,
      schema: schema,
      path: path,
    }));
    return elements;
  }
}
