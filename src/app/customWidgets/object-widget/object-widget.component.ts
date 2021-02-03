import { Component } from "@angular/core";
import { ObjectWidget } from "ngx-schema-form";

@Component({
  selector: "sf-form-object",
  template: `<fieldset *ngFor="let fieldset of formProperty.schema.fieldsets">
	<legend *ngIf="fieldset.title">{{fieldset.title}}</legend>
    <button *ngIf="fieldset.description" type="button" class="btn btn-outline-secondary mr-2" placement="right" ngbTooltip="{{fieldset.description}}">
    ?
    </button>
	<div *ngFor="let fieldId of fieldset.fields">
		<sf-form-element [formProperty]="formProperty.getProperty(fieldId)"></sf-form-element>
	</div>
</fieldset>`
})
export class ObjectWidgetComponent extends ObjectWidget   {

}