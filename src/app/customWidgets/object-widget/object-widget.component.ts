import { Component } from "@angular/core";
import { ObjectWidget } from "ngx-schema-form";

@Component({
  selector: "sf-form-object",
  template: `<fieldset *ngFor="let fieldset of formProperty.schema.fieldsets">
	<legend *ngIf="fieldset.title">{{fieldset.title}}
  <ng-template #tipContent><div *ngIf=schema.description><u>Description</u> : {{this.schema.description}}</div><div *ngIf=schema.examples><u>Examples</u> : <span *ngFor="let obj of this.schema.examples"> {{obj | json}} </span></div></ng-template>
  <button *ngIf="schema.description || schema.examples" id="HelpButton" type="button" class="btn btn-outline-info mr-2" placement="right" [ngbTooltip]="tipContent">
?
</button>
</legend>


	<div *ngFor="let fieldId of fieldset.fields">
		<sf-form-element  [formProperty]="formProperty.getProperty(fieldId)"></sf-form-element>
	</div>
</fieldset>`
})
export class ObjectWidgetComponent extends ObjectWidget   {

}