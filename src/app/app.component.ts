import { Component } from '@angular/core';
import { angularMaterialRenderers } from '@jsonforms/angular-material';
import {
  and,
  createAjv,
  isControl, JsonSchema,
  optionIs,
  rankWith,
  schemaTypeIs,
  scopeEndsWith,
  Tester,
  UISchemaElement
} from '@jsonforms/core';
import { CustomAutocompleteControlRenderer } from './custom.autocomplete';
import { DataDisplayComponent } from './data.control';
import { LangComponent } from './lang.control';
import uischemaAsset from '../assets/uischema.json';
import schemaAsset from '../assets/schema.json';
import dataAsset from './data';
import { parsePhoneNumber } from 'libphonenumber-js';
import { DateAdapter } from '@angular/material/core';




const departmentTester: Tester = and(
  schemaTypeIs('string'),
  scopeEndsWith('firstname')
);


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  renderers = [
    ...angularMaterialRenderers,
    { tester: rankWith(5, departmentTester), renderer: CustomAutocompleteControlRenderer }





  ];
  uischema = uischemaAsset;
  schema = schemaAsset;
  data = dataAsset;
  i18n = { locale: 'de-DE' };
  dateAdapter;
  ajv = createAjv({
    schemaId: 'id',
    allErrors: true
  });
  constructor(dateAdapter: DateAdapter<Date>) {
    this.ajv.addFormat('time', '^([0-1][0-9]|2[0-3]):[0-5][0-9]$');
    this.dateAdapter = dateAdapter;
    dateAdapter.setLocale(this.i18n.locale);
    this.ajv.addFormat('tel', maybePhoneNumber => {
      try {
        parsePhoneNumber(maybePhoneNumber, 'CZ');
        return true;
      } catch (_) {
        return false;
      }
    });
  }
}
