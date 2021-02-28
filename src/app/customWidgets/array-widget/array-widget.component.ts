import { Component } from '@angular/core';
import { ArrayWidget, FormProperty } from 'ngx-schema-form';

@Component({
  selector: 'sf-array-widget',
  templateUrl: 'array-widget.component.html',
})
export class ArrayWidgetComponent extends ArrayWidget {
  removeInputAndUiItem(item: FormProperty, i: number) {
    this.removeItem(item);
    if (this.id == 'inputs') {
      var removeUiButton: any;
      removeUiButton = document.getElementsByClassName('removeUiButton')[i];
      removeUiButton.click();
    }
  }

  addInputAndUiItem() {
    this.addItem();
    if (this.id == 'inputs') {
      var btnAddUi: any;
      btnAddUi = document.getElementById('addUiButton');
      btnAddUi.click();
    }
  }
}
