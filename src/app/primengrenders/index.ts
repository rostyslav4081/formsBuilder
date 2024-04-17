import 'hammerjs';
import { RankedTester } from '@jsonforms/core';

import {BooleanPrimeNgControlRenderer, booleanPrimeNgControlTester} from "./controls/boolean.render";
import {TextPrimeNgControlRenderer, TextPrimeNgControlRendererTester} from "./controls/text.render";

import {FileInputPrimeNgRenderer, FileInputPrimeNgRendererTester} from "./controls/fileinput.render";
import {TextAreaPrimeNgRenderer, TextAreaPrimeNgRendererTester} from "./controls/textarea.render";
import {DatePrimeNgControlRenderer, DatePrimeNgControlRendererTester} from "./controls/date.render";
import {VerticalLayoutPrimeNgRenderer, verticalLayoutPrimeNgTester} from "./layouts/vertical-layout.renderer";
import {HorizontalLayoutPrimeNgRenderer, horizontalLayoutPrimeNgTester} from "./layouts/horizontal-layout.renderer";
import {LabelPrimeNgRenderer, LabelPrimeNgRendererTester} from "./controls/label.render";
import {ObjectPrimeNgControlRenderer, ObjectPrimeNgControlRendererTester} from "./controls/object.render";
import {GroupLayoutPrimeNgRenderer, groupLayoutPrimeNgTester} from "./layouts/group-layout.renderer";
import {
  categorizationPrimeNgTester,
  CategorizationTabLayoutPrimeNgRenderer
} from "./layouts/categorization-layout.renderer";
import {ArrayLayoutPrimeNgRenderer, ArrayLayoutPrimeNgRendererTester} from "./layouts/array-layout.renderer";





export const angularPrimeNgRenderers: {
  tester: RankedTester;
  renderer: any;
}[] = [
  // controls
  { tester: booleanPrimeNgControlTester, renderer: BooleanPrimeNgControlRenderer },
  { tester: TextPrimeNgControlRendererTester, renderer: TextPrimeNgControlRenderer },
  { tester: TextAreaPrimeNgRendererTester, renderer: TextAreaPrimeNgRenderer },
  { tester: DatePrimeNgControlRendererTester, renderer: DatePrimeNgControlRenderer },
  // { tester: ObjectPrimeNgControlRendererTester, renderer: ObjectPrimeNgControlRenderer },
  { tester: FileInputPrimeNgRendererTester, renderer: FileInputPrimeNgRenderer },


  // layouts
  // { tester: verticalLayoutPrimeNgTester, renderer: VerticalLayoutPrimeNgRenderer },
  // { tester: groupLayoutPrimeNgTester, renderer: GroupLayoutPrimeNgRenderer },
  // { tester: horizontalLayoutPrimeNgTester, renderer: HorizontalLayoutPrimeNgRenderer },
  // { tester: ArrayLayoutPrimeNgRendererTester, renderer: ArrayLayoutPrimeNgRenderer },
  // { tester: categorizationPrimeNgTester, renderer: CategorizationTabLayoutPrimeNgRenderer },
  { tester: LabelPrimeNgRendererTester, renderer: LabelPrimeNgRenderer },

];
