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
import {CustomDateAutocompleteControlRenderer} from "./customDate.autocomplete";
import {HugeLabelAutocompleteControlRenderer} from "./hugeLabel.autocomplete";
import {SmallLabelAutocompleteRenderer} from "./smallLabel.autocomplete";
import {FileUploadAutocompleteControlRenderer} from "./fileUpload.autocomplete";
import {angularPrimeNgRenderers} from "./primengrenders";




const pFirstnameInputTester: Tester = and(
  schemaTypeIs('string'),
  scopeEndsWith('firstname')
);
const pLastnameInputTester: Tester = and(
  schemaTypeIs('string'),
  scopeEndsWith('lastname')
);
const pPhoneNumberInputTester: Tester = and(
  schemaTypeIs('string'),
  scopeEndsWith('phoneNumber')
);
const pEmailInputTester: Tester = and(
  schemaTypeIs('string'),
  scopeEndsWith('email')
);
const pDateInputTester: Tester = and(
  schemaTypeIs('string'),
  scopeEndsWith('pickerDate')
);
const pPostCodeInputTester: Tester = and(
  schemaTypeIs('string'),
  scopeEndsWith('postCode')
);
const pNameBuildingInputTester: Tester = and(
  schemaTypeIs('string'),
  scopeEndsWith('nameBuilding')
);
const pHugeLabelTester: Tester = and(
  schemaTypeIs('string'),
  scopeEndsWith('hugeLabel')
);
const pSmallLabelTester: Tester = and(
  schemaTypeIs('string'),
  scopeEndsWith('smallLabel')
);
const pFileUploadTester: Tester = and(
  schemaTypeIs('string'),
  scopeEndsWith('fileUpload')
);
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  renderers = [
    ...angularPrimeNgRenderers,





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
