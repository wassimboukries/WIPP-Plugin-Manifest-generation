import { Component } from "@angular/core";
import { ObjectWidget } from "ngx-schema-form";

@Component({
  selector: "sf-form-object",
  template: `<fieldset *ngFor="let fieldset of formProperty.schema.fieldsets">
	<h5 *ngIf="fieldset.title">{{fieldset.title}}</h5>
  <ng-template #tipContent><div *ngIf=schema.description><u>Description</u> : {{this.schema.description}}</div><div *ngIf=schema.examples><u>Examples</u> : {{this.schema.examples}}</div></ng-template>
  <button *ngIf="schema.description || schema.examples" id="HelpButton" type="button" class="btn btn-outline-info mr-2" placement="right" [ngbTooltip]="tipContent">
?
</button>
	<div *ngFor="let fieldId of fieldset.fields">
		<sf-form-element [formProperty]="formProperty.getProperty(fieldId)"></sf-form-element>
	</div>
</fieldset>`
})
export class ObjectWidgetComponent extends ObjectWidget   {

}