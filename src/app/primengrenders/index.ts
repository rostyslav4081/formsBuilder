import 'hammerjs';
import { RankedTester } from '@jsonforms/core';

import {BooleanPrimeNgControlRenderer, booleanPrimeNgControlTester} from "./controls/boolean.render";
import {TextPrimeNgControlRenderer, TextPrimeNgControlRendererTester} from "./controls/text.render";
import {ButtonPrimeNgRenderer, ButtonPrimeNgRendererTester} from "./controls/btn.render";
import {FileInputPrimeNgRenderer, FileInputPrimeNgRendererTester} from "./controls/fileinput.render";
import {TextAreaPrimeNgRenderer, TextAreaPrimeNgRendererTester} from "./controls/textarea.render";
import {DatePrimeNgControlRenderer, DatePrimeNgControlRendererTester} from "./controls/date.render";
import {VerticalLayoutPrimeNgRenderer, verticalLayoutPrimeNgTester} from "./layouts/vertical-layout.renderer";
import {HorizontalLayoutPrimeNgRenderer, horizontalLayoutPrimeNgTester} from "./layouts/horizontal-layout.renderer";
import {LabelPrimeNgRenderer, LabelPrimeNgRendererTester} from "./controls/label.render";




export const angularPrimeNgRenderers: {
  tester: RankedTester;
  renderer: any;
}[] = [
  // controls
  { tester: booleanPrimeNgControlTester, renderer: BooleanPrimeNgControlRenderer },
  { tester: TextPrimeNgControlRendererTester, renderer: TextPrimeNgControlRenderer },
  { tester: TextAreaPrimeNgRendererTester, renderer: TextAreaPrimeNgRenderer },


  { tester: DatePrimeNgControlRendererTester, renderer: DatePrimeNgControlRenderer },

  { tester: FileInputPrimeNgRendererTester, renderer: FileInputPrimeNgRenderer },
  { tester: ButtonPrimeNgRendererTester, renderer: ButtonPrimeNgRenderer },
  // layouts
  { tester: verticalLayoutPrimeNgTester, renderer: VerticalLayoutPrimeNgRenderer },

  { tester: horizontalLayoutPrimeNgTester, renderer: HorizontalLayoutPrimeNgRenderer },

  { tester: LabelPrimeNgRendererTester, renderer: LabelPrimeNgRenderer },


];
