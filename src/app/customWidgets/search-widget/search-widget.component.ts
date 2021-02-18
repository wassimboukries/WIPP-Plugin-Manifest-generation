import { Component } from '@angular/core';
import { StringWidget } from 'ngx-schema-form';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-search-widget',
  templateUrl: './search-widget.component.html',
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
}
