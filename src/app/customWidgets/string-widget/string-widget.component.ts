import { Component } from "@angular/core";
import { StringWidget } from "ngx-schema-form";


@Component({
  selector: "sf-string-widget",
  template: `<input *ngIf="this.schema.widget.id ==='hidden'; else notHiddenFieldBlock"
  [attr.name]="name" type="hidden" [formControl]="control">
<ng-template #notHiddenFieldBlock>
<div class="widget form-group">
    <label [attr.for]="id" class="horizontal control-label">
        {{ schema.title}}
        </label>
        <button *ngIf="schema.description" type="button" class="btn btn-outline-secondary mr-2" placement="right" ngbTooltip="{{schema.description}}">
    ?
    </button>
        
    <input [name]="name" [attr.readonly]="(schema.widget.id!=='color') && schema.readOnly?true:null"
    class="text-widget.id textline-widget form-control"
    [attr.type]="!this.schema.widget.id || this.schema.widget.id === 'string' ? 'text' : this.schema.widget.id"
    [attr.id]="id"  [formControl]="control" [attr.placeholder]="schema.placeholder"
    [attr.maxLength]="schema.maxLength || null"
    [attr.minLength]="schema.minLength || null"
    [attr.required]="schema.isRequired || null"
    [attr.disabled]="(schema.widget.id=='color' && schema.readOnly)?true:null" autocomplete="off">
    <span [attr.id]="id + 'Status'" ></span>
    <input *ngIf="(schema.widget.id==='color' && schema.readOnly)" [attr.name]="name" type="hidden" [formControl]="control">
    
    
</div>
</ng-template>`
})

export class StringWidgetComponent extends StringWidget  {
  ngAfterViewInit()
  {
    if(this.schema.pattern){
      var inputElt = document.getElementById(this.id);
      var spanElt = document.getElementById(this.id + "Status");
      console.log(this.schema.default);
      inputElt.addEventListener("focus", (event) => inputEvent(event, this.schema));
      inputElt.addEventListener("focusout", function () {
        spanElt.textContent="";
      });
    }
         
    function inputEvent(event, schema)
    {
      var patt = new RegExp(schema.pattern);
      
      if (patt.test((<HTMLTextAreaElement>event.target).value))
      {
        spanElt.textContent = "Valid";
        spanElt.style.color = "green";
      }
      else {
        spanElt.textContent = "Invalid, your input must match the pattern : " + patt;
        spanElt.style.color = "red";
      }
    }
  }

}