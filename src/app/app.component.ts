import {Component, Input, input} from '@angular/core';
import { angularMaterialRenderers } from '@jsonforms/angular-material';
import {
  and,
  createAjv, formatIs,
  isControl, JsonFormsI18nState,
  JsonSchema,
  optionIs,
  rankWith,
  schemaTypeIs,
  scopeEndsWith,
  Tester,
  UISchemaElement,
} from '@jsonforms/core';

import uischemaAsset from '../assets/uischema.json';
import schemaAsset from '../assets/schema.json';

import { parsePhoneNumber } from 'libphonenumber-js';
import { DateAdapter } from '@angular/material/core';

import { angularPrimeNgRenderers } from './primengrenders';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  renderers = [
    // ...angularMaterialRenderers,
    ...angularPrimeNgRenderers,

  ];
  uischema = uischemaAsset;
  schema = schemaAsset;
  data: any;
  locale: 'cz' | 'en' | 'de' = 'cz';
  createTranslator(locale: 'cz' | 'de' | 'en'): (key: string, defaultMessage: string | undefined, context: any) => string {
    return (key: string, defaultMessage: string | undefined, context: any) => {
      // console.log(`Locale: ${locale}, Key: ${key}, Default Message: ${defaultMessage}, Context: ${context}`);
      return defaultMessage || '';
    };
  }
  i18n = { locale: this.locale, translate: this.createTranslator(this.locale) };


  dateAdapter;
  ajv = createAjv({
    schemaId: 'id',
    allErrors: true,
  });
  constructor(dateAdapter: DateAdapter<Date>) {
    // custom file format
    this.ajv.addFormat('file', (data) => true);

    this.ajv.addFormat('time', '^([0-1][0-9]|2[0-3]):[0-5][0-9]$');
    this.dateAdapter = dateAdapter;
    dateAdapter.setLocale(this.i18n.locale);



    this.ajv.addFormat('tel', (maybePhoneNumber) => {
      try {
        parsePhoneNumber(maybePhoneNumber, 'CZ');
        return true;
      } catch (_) {
        return false;
      }
    });
  }

  submitForm() {
    console.log(this.data);
  }
}
