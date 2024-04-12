import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JsonSchemaFormModule } from '@ajsf/core';
import { JsonFormsAngularMaterialModule } from '@jsonforms/angular-material';
import { AppComponent } from './app.component';
import { CustomAutocompleteControlRenderer } from './custom.autocomplete';
import { DataDisplayComponent } from './data.control';
import { LangComponent } from './lang.control';


import {JsonFormsAngularService, JsonFormsModule} from "@jsonforms/angular";

import {AutoCompleteModule} from "primeng/autocomplete";
import {InputTextModule} from "primeng/inputtext";
import {MessageModule} from "primeng/message";
import {CustomDateAutocompleteControlRenderer} from "./customDate.autocomplete";
import {CalendarModule} from "primeng/calendar";
import {HugeLabelAutocompleteControlRenderer} from "./hugeLabel.autocomplete";
import {SmallLabelAutocompleteRenderer} from "./smallLabel.autocomplete";
import {FileUploadAutocompleteControlRenderer} from "./fileUpload.autocomplete";
import {FileUploadModule} from "primeng/fileupload";




@NgModule({
  declarations: [
    AppComponent,
    CustomAutocompleteControlRenderer,
    LangComponent,
    DataDisplayComponent,
    CustomDateAutocompleteControlRenderer,
    HugeLabelAutocompleteControlRenderer,
    SmallLabelAutocompleteRenderer,
    FileUploadAutocompleteControlRenderer
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    JsonFormsModule,
    JsonFormsAngularMaterialModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    JsonSchemaFormModule,
    AutoCompleteModule,
    InputTextModule,
    MessageModule,
    CalendarModule,
    FileUploadModule,


  ],
  schemas: [],

  exports: [
    CustomAutocompleteControlRenderer
  ],
  providers: [JsonFormsAngularService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
