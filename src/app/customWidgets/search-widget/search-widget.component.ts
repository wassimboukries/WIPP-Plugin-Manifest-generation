import { Component } from '@angular/core';
import { StringWidget } from 'ngx-schema-form';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-search-widget',
  templateUrl: './search-widget.component.html',
  styleUrls: ['./search-widget.component.css'],
})
export class SearchWidgetComponent extends StringWidget {
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        this.schema.enum.filter(
          (v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1
        )
      )
    );

  checkIfPatternMatch(value: string) {
    var patt = new RegExp(this.schema.pattern);
    if (patt.test(value)) return true;
    return false;
  }
}
