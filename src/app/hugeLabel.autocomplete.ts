import {generate} from "random-words";
import {debounceTime, finalize, tap} from 'rxjs/operators';
import {switchMap} from 'rxjs/operators';
import {delay} from 'rxjs/operators';
import {of} from 'rxjs';
import {AutocompleteControlRenderer} from '@jsonforms/angular-material';
import {Observable} from 'rxjs';
import {Component} from '@angular/core';

const generated = generate(1000);
const words: string[] = Array.isArray(generated) ? generated : [generated];

const fetchSuggestions = (input: string): Observable<string[]> => {
  const filtered: string[] = words.filter(word => word.startsWith(input));
  return of(filtered).pipe(delay(1000));
};

@Component({
  selector: 'jsonforms-custom-autocomplete',
  template: `
    <div class="p-fluid">
      <label>{{ label }}</label>


    </div>

  `
})
export class HugeLabelAutocompleteControlRenderer extends AutocompleteControlRenderer {

  isLoading!: boolean;

  override ngOnInit() {
    super.ngOnInit();
    this.form.valueChanges
      .pipe(
        debounceTime(300),
        tap(() => this.isLoading = true),
        switchMap(value => fetchSuggestions(value)
          .pipe(
            finalize(() => this.isLoading = false)
          )
        )
      )
      .subscribe((options: string[]) => this.options = options);
  }
}
