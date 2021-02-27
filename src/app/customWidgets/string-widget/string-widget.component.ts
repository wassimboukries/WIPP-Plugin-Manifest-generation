import { ChangeDetectorRef, Component } from '@angular/core';
import { ControlWidget } from 'ngx-schema-form';

@Component({
  selector: 'sf-string-widget',
  templateUrl: 'string-widget.component.html',
  styleUrls: ['./string-widget.component.css'],
})
export class StringWidgetComponent extends ControlWidget {
  constructor(private ref: ChangeDetectorRef) {
    super();
  }

  ngAfterViewChecked() {
    this.ref.detectChanges();
  }
  checkIfPatternMatch(value: string) {
    var patt = new RegExp(this.schema.pattern);
    if (patt.test(value)) return true;
    return false;
  }
}
