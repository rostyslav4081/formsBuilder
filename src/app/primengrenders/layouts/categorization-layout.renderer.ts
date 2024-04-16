import {
  and,
  Categorization,
  categorizationHasCategory,
  Category,
  defaultJsonFormsI18nState,
  deriveLabelForUISchemaElement,
  getAjv,
  isVisible,
  JsonFormsState,
  Labelable,
  mapStateToLayoutProps,
  RankedTester,
  rankWith,
  uiTypeIs,
} from '@jsonforms/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  JsonFormsAngularService,
  JsonFormsBaseRenderer,
} from '@jsonforms/angular';
import { Subscription } from 'rxjs';


@Component({
  selector: 'jsonforms-categorization-layout',
  template: `
    <p-tabView
      [ngStyle]="{ 'display': hidden ? 'none' : '' }"

    >
      <ng-container *ngFor="let category of visibleCategories; let i = index">
        <p-tabPanel [header]="categoryLabels[i]">
          <div *ngFor="let element of category.elements">
            <jsonforms-outlet
              [uischema]="element"
              [path]="path"
              [schema]="schema"
            ></jsonforms-outlet>
          </div>
        </p-tabPanel>
      </ng-container>
    </p-tabView>

  `,
})
export class CategorizationTabLayoutPrimeNgRenderer
  extends JsonFormsBaseRenderer<Categorization>
  implements OnInit, OnDestroy
{
  hidden: boolean = true;
  visibleCategories: (Category | Categorization)[] = [];
  private subscription: Subscription | undefined;
  categoryLabels: string[] = [];

  constructor(private jsonFormsService: JsonFormsAngularService) {
    super();
  }

  ngOnInit(): void {
    this.subscription = this.jsonFormsService.$state.subscribe({
      next: (state: JsonFormsState) => {
        const props = mapStateToLayoutProps(state, this.getOwnProps());
        this.hidden = !props.visible;
        this.visibleCategories = this.uischema.elements.filter(
          (category: Category | Categorization) =>
            isVisible(category, props.data, '', getAjv(state))
        );
        // Filter out undefined values from labels
        this.categoryLabels = this.visibleCategories.map((element) =>
          deriveLabelForUISchemaElement(
            element as Labelable<boolean>,
            state.jsonforms.i18n?.translate ?? defaultJsonFormsI18nState.translate
          )
        ).filter((label): label is string => typeof label === 'string');
      },
    });
  }



  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

export const categorizationPrimeNgTester: RankedTester = rankWith(
  2,
  and(uiTypeIs('Categorization'), categorizationHasCategory)
);
