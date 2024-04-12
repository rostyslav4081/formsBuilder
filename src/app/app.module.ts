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
// import {Custom2AutocompleteComponent} from "./custom2.autocomplete";
import {AutoCompleteModule} from "primeng/autocomplete";
import {InputTextModule} from "primeng/inputtext";
import {MessageModule} from "primeng/message";




@NgModule({
  declarations: [
    AppComponent,
    CustomAutocompleteControlRenderer,
    LangComponent,
    DataDisplayComponent,
    // Custom2AutocompleteComponent
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
