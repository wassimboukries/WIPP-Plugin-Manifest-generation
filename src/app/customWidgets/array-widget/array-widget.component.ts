import { Component } from "@angular/core";
import {  ArrayWidget } from "ngx-schema-form";

@Component({
  selector: "sf-array-widget",
  template: `<div class="widget form-group">
	<label [attr.for]="id" class="horizontal control-label">
		{{ schema.title }}
	</label>
	<button type="button" class="btn btn-outline-secondary mr-2" placement="right" ngbTooltip="{{schema.description}}">
    ?
    </button>
	<div *ngFor="let itemProperty of formProperty.properties">
		<sf-form-element [formProperty]="itemProperty"></sf-form-element>
		<button (click)="removeItem(itemProperty)" class="btn btn-outline-secondary array-remove-button"
			[disabled]="isRemoveButtonDisabled()" 
			*ngIf="!(schema.hasOwnProperty('minItems') && schema.hasOwnProperty('maxItems') && schema.minItems === schema.maxItems)"
			>
			<span class="glyphicon glyphicon-minus" aria-hidden="true">Remove</span> 
		</button>
	</div>
	<button (click)="addItem()" class="btn btn-outline-secondary array-add-button"
		[disabled]="isAddButtonDisabled()"
		*ngIf="!(schema.hasOwnProperty('minItems') && schema.hasOwnProperty('maxItems') && schema.minItems === schema.maxItems)"
	>
		<span class="glyphicon glyphicon-plus" aria-hidden="true">Add</span> 
	</button>
</div>`
})
export class ArrayWidgetComponent extends ArrayWidget  {

}