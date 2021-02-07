import { AfterViewInit, Component } from "@angular/core";
import { ControlWidget } from "ngx-schema-form";


@Component({
  selector: "sf-string-widget",
  template: `<input *ngIf="this.schema.widget.id ==='hidden'; else notHiddenFieldBlock"
  [attr.name]="name" type="hidden" [formControl]="control">
<ng-template #notHiddenFieldBlock>
<div class="widget form-group">
    <label [attr.for]="id" class="horizontal control-label">
        {{ schema.title}} <span *ngIf="schema.isRequired" style="color:red;">*</span>
        </label>
        <ng-template #tipContent><div *ngIf=schema.description><u>Description</u> : {{this.schema.description}}</div><div *ngIf=schema.examples><u>Examples</u> : {{this.schema.examples}}</div></ng-template>
        <button *ngIf="schema.description || schema.examples" id="HelpButton" type="button" class="btn btn-outline-info mr-2" placement="right" [ngbTooltip]="tipContent">
    ?
    </button>
        
    <input [attr.value]="schema.default" [name]="name" [attr.readonly]="(schema.widget.id!=='color') && schema.readOnly?true:null"
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

export class StringWidgetComponent extends ControlWidget implements AfterViewInit{
  ngAfterViewInit()
  {
    super.ngAfterViewInit();
    if(this.schema.pattern){
      var inputElt = document.getElementById(this.id);
      var spanElt = document.getElementById(this.id + "Status");
      inputElt.addEventListener("input", (event) => inputEvent(event, this.schema));
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