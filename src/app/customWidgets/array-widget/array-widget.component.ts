import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { ArrayWidget } from 'ngx-schema-form';

@Component({
  selector: 'sf-array-widget',
  templateUrl: 'array-widget.component.html',
})
export class ArrayWidgetComponent extends ArrayWidget {
  constructor(private cd: ChangeDetectorRef) {
    super();
  }
}
