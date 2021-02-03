import { Component } from "@angular/core";
import {  CheckboxWidget } from "ngx-schema-form";

@Component({
    selector: 'sf-boolean-widget',
    template: `<div class="widget form-group">
      <label [attr.for]="id" class="horizontal control-label">
          {{ schema.title }}
      </label>
      <div *ngIf="schema.type!='array'" class="checkbox">
          <label class="horizontal control-label">
              <input [formControl]="control" [attr.name]="name" [attr.id]="id" [indeterminate]="control.value !== false && control.value !== true ? true :null" type="checkbox" [disabled]="schema.readOnly">
              <input *ngIf="schema.readOnly" [attr.name]="name" type="hidden" [formControl]="control">
              <button *ngIf="schema.description" type="button" class="btn btn-outline-secondary mr-2" placement="right" ngbTooltip="{{schema.description}}">
    ?
    </button>
          </label>
      </div>
      <ng-container *ngIf="schema.type==='array'">
          <div *ngFor="let option of schema.items.oneOf" class="checkbox">
              <label class="horizontal control-label">
                  <input [attr.name]="name"
                      value="{{option.enum[0]}}" type="checkbox" 
                      [attr.disabled]="schema.readOnly"
                      (change)="onCheck($event.target)"
                      [attr.checked]="checked[option.enum[0]] ? true : null"
                      [attr.id]="id + '.' + option.enum[0]"
                      >
                  {{option.description}}
              </label>
          </div>
      </ng-container>
  </div>`
})
export class BooleanWidgetComponent extends CheckboxWidget  {

}