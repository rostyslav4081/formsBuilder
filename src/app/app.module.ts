import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JsonSchemaFormModule } from '@ajsf/core';
import { JsonFormsAngularMaterialModule } from '@jsonforms/angular-material';
import { AppComponent } from './app.component';

import { DataDisplayComponent } from './data.control';



import {JsonFormsAngularService, JsonFormsModule} from "@jsonforms/angular";

import {AutoCompleteModule} from "primeng/autocomplete";
import {InputTextModule} from "primeng/inputtext";
import {MessageModule} from "primeng/message";

import {CalendarModule} from "primeng/calendar";



import {FileUploadModule} from "primeng/fileupload";
import {BooleanPrimeNgControlRenderer} from "./primengrenders/controls/boolean.render";
import {ButtonPrimeNgRenderer} from "./primengrenders/controls/btn.render";
import {DatePrimeNgControlRenderer} from "./primengrenders/controls/date.render";
import {FileInputPrimeNgRenderer} from "./primengrenders/controls/fileinput.render";
import {LabelPrimeNgRenderer} from "./primengrenders/controls/label.render";
import {TextPrimeNgControlRenderer} from "./primengrenders/controls/text.render";
import {TextAreaPrimeNgRenderer} from "./primengrenders/controls/textarea.render";
import {HorizontalLayoutPrimeNgRenderer} from "./primengrenders/layouts/horizontal-layout.renderer";
import {LayoutChildrenRenderPropsPipe, LayoutRenderer} from "./primengrenders/layouts/layout.renderer";
import {VerticalLayoutPrimeNgRenderer} from "./primengrenders/layouts/vertical-layout.renderer";
import {CheckboxModule} from "primeng/checkbox";
import {TooltipModule} from "primeng/tooltip";
import {PaginatorModule} from "primeng/paginator";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ObjectPrimeNgControlRenderer} from "./primengrenders/controls/object.render";
import {CardModule} from "primeng/card";




@NgModule({
  declarations: [
    AppComponent,
    BooleanPrimeNgControlRenderer,
    ButtonPrimeNgRenderer,
    DataDisplayComponent,
    DatePrimeNgControlRenderer,
    FileInputPrimeNgRenderer,
    LabelPrimeNgRenderer,
    TextPrimeNgControlRenderer,
    TextAreaPrimeNgRenderer,
    HorizontalLayoutPrimeNgRenderer,
    LayoutChildrenRenderPropsPipe,
    VerticalLayoutPrimeNgRenderer,
    LayoutRenderer,
    ObjectPrimeNgControlRenderer,


  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    JsonFormsModule,
    JsonFormsAngularMaterialModule,

    MatProgressSpinnerModule,
    HttpClientModule,
    JsonSchemaFormModule,
    AutoCompleteModule,
    InputTextModule,
    MessageModule,
    CalendarModule,
    FileUploadModule,
    CheckboxModule,
    TooltipModule,
    PaginatorModule,
    InputTextareaModule,
    CardModule,


  ],
  schemas: [],

  exports: [

  ],
  providers: [JsonFormsAngularService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
