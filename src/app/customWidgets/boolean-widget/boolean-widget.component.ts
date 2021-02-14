import { Component } from "@angular/core";
import {  CheckboxWidget } from "ngx-schema-form";

@Component({
    selector: 'sf-boolean-widget',
    templateUrl: 'boolean-widget.component.html'
})
export class BooleanWidgetComponent extends CheckboxWidget  {

}