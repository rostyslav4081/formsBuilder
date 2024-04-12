// import { Component } from '@angular/core';
// import { FormControl } from '@angular/forms';
// import {Observable, of} from 'rxjs';
// import {debounceTime, delay, finalize, switchMap} from 'rxjs/operators';
// import { generate } from 'random-words';
// import {AutocompleteControlRenderer} from "@jsonforms/angular-material";
//
// const generated = generate(1000);
// const words: string[] = Array.isArray(generated) ? generated : [generated];
//
// const fetchSuggestions = (input: string): Observable<string[]> => {
//   const filtered: string[] = words.filter(word => word.startsWith(input));
//   return of(filtered).pipe(delay(1000));
// };
//
// @Component({
//   selector: 'app-custom-autocomplete',
//   template: `
//     <div class="p-field">
//
//       <p-autoComplete
//         [formControl]="form"
//         [suggestions]="filteredOptions"
//         (completeMethod)="onInput($event)"
//         [minLength]="1"
//         [placeholder]="description"
//         [id]="id"
//       >
//       </p-autoComplete>
//
//     </div>
//   `
// })
// export class Custom2AutocompleteComponent extends AutocompleteControlRenderer{
//   override label = 'Your Label';
//   override description = 'Your Description';
//   override id = 'autocomplete';
//   override form = new FormControl();
//   isLoading = false;
//
//   onInput(event: any) {
//     const value = event.query;
//     this.isLoading = true;
//     this.filteredOptions = fetchSuggestions(value)
//       .pipe(finalize(() => this.isLoading = false));
//   }
// }
