import { Component } from "@angular/core";
import { IntegerWidget } from "ngx-schema-form";

@Component({
  selector: "sf-integer-widget",
  template: `<div class="widget form-group">
	<label [attr.for]="id" class="horizontal control-label">
		{{ schema.title }} <span *ngIf="schema.isRequired" style="color:red;">*</span>
	</label>
    <ng-template #tipContent><div *ngIf=schema.description><u>Description</u> : {{this.schema.description}}</div><div *ngIf=schema.examples><u>Examples</u> : {{this.schema.examples}}</div></ng-template>
        <button *ngIf="schema.description || schema.examples" id="HelpButton" type="button" class="btn btn-outline-info mr-2" placement="right" [ngbTooltip]="tipContent">
    ?
    </button>
	<input [attr.readonly]="schema.readOnly?true:null" [attr.name]="name"
	[attr.id]="id"
	class="text-widget integer-widget form-control" [formControl]="control"
	[attr.type]="'number'" [attr.min]="schema.minimum" [attr.max]="schema.maximum"
	[attr.placeholder]="schema.placeholder"
	[attr.maxLength]="schema.maxLength || null"
	[attr.required]="schema.isRequired || null"
  [attr.minLength]="schema.minLength || null">
</div>`
})
export class IntegerWidgetComponent extends IntegerWidget   {

}