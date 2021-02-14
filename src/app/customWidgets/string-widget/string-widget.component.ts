import { AfterViewInit, Component } from '@angular/core';
import { ControlWidget } from 'ngx-schema-form';

@Component({
  selector: 'sf-string-widget',
  templateUrl: 'string-widget.component.html',
})
export class StringWidgetComponent
  extends ControlWidget
  implements AfterViewInit {
  ngAfterViewInit() {
    super.ngAfterViewInit();
    if (this.schema.pattern) {
      var inputElt = document.getElementById(this.id);
      var spanElt = document.getElementById(this.id + 'Status');
      inputElt.addEventListener('input', (event) =>
        inputEvent(event, this.schema)
      );
      inputElt.addEventListener('focusout', function () {
        spanElt.textContent = '';
      });
    }

    function inputEvent(event, schema) {
      var patt = new RegExp(schema.pattern);

      if (patt.test((<HTMLTextAreaElement>event.target).value)) {
        spanElt.textContent = 'Valid';
        spanElt.style.color = 'green';
      } else {
        spanElt.textContent =
          'Invalid, your input must match the pattern : ' +
          patt.toString().substring(1, patt.toString().length - 2);
        spanElt.style.color = 'red';
      }
    }
  }
}
