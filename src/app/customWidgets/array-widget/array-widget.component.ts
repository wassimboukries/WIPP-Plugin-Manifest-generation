import { Component } from "@angular/core";
import {  ArrayWidget } from "ngx-schema-form";

@Component({
  selector: "sf-array-widget",
  template: `<div class="widget form-group">
	<h4 [attr.for]="id" class="horizontal control-label">
		{{ schema.title }}
	</h4>
	<ng-template #tipContent><div *ngIf=schema.description><u>Description</u> : {{this.schema.description}}</div><div *ngIf=schema.examples><u>Examples</u> : {{this.schema.examples}}</div></ng-template>
        <button *ngIf="schema.description || schema.examples" id="HelpButton" type="button" class="btn btn-outline-info mr-2" placement="right" [ngbTooltip]="tipContent">
    ?
    </button>
	<div *ngFor="let itemProperty of formProperty.properties">
		<sf-form-element [formProperty]="itemProperty"></sf-form-element>
		<button  [id]="(id === 'ui' ? 'removeUiButton': (id == 'inputs' ? 'removeInputButton' : '' ))"  (click)="removeItem(itemProperty)" class="btn btn-outline-secondary array-remove-button"
			[disabled]="isRemoveButtonDisabled()" 
			*ngIf="!(schema.hasOwnProperty('minItems') && schema.hasOwnProperty('maxItems') && schema.minItems === schema.maxItems)"
			>
			<span class="glyphicon glyphicon-minus" aria-hidden="true">Remove</span> 
		</button>
	</div>
	<button [id]="(id === 'ui' ? 'addUiButton': (id == 'inputs' ? 'addInputButton' : '' ))"  [ngClass]="{'d-none': id === 'ui'}" style="margin-top:5px;" (click)="addItem()" class="btn btn-outline-secondary array-add-button"
		[disabled]="isAddButtonDisabled()"
		*ngIf="!(schema.hasOwnProperty('minItems') && schema.hasOwnProperty('maxItems') && schema.minItems === schema.maxItems)"
	>
		<span class="glyphicon glyphicon-plus" aria-hidden="true">Add</span> 
	</button>
</div>`
})
export class ArrayWidgetComponent extends ArrayWidget  {


	
}