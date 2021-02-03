import { Component } from "@angular/core";
import { IntegerWidget } from "ngx-schema-form";

@Component({
  selector: "sf-integer-widget",
  template: `<div class="widget form-group">
	<label [attr.for]="id" class="horizontal control-label">
		{{ schema.title }}
	</label>
    <button type="button" class="btn btn-outline-secondary mr-2" placement="right" ngbTooltip="{{schema.description}}">
    ?
    </button>
	<input [attr.readonly]="schema.readOnly?true:null" [attr.name]="name"
	[attr.id]="id"
	class="text-widget integer-widget form-control" [formControl]="control"
	[attr.type]="'number'" [attr.min]="schema.minimum" [attr.max]="schema.maximum"
	[attr.placeholder]="schema.placeholder"
	[attr.maxLength]="schema.maxLength || null"
  [attr.minLength]="schema.minLength || null">
</div>`
})
export class IntegerWidgetComponent extends IntegerWidget   {

}