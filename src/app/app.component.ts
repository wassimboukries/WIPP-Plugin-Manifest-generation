import { Component } from '@angular/core';
import { FormProperty, PropertyGroup } from 'ngx-schema-form';
import { ButtonComponent } from 'ngx-schema-form/lib/template-schema/button/button.component';
import {mySchema} from './WIPP schema.js';
import {NgbModal, NgbActiveModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import { isWhileStatement } from 'typescript';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NgbModalConfig, NgbModal]
})


export class AppComponent {
 value: any;
 
 constructor(config: NgbModalConfig, private modalService: NgbModal) {
   config.backdrop = 'static';
   config.keyboard = false;
 }
 
 ngOnInit() // bindings
 {  
   window.onload = () => {
       var btnAdd0 : HTMLElement = document.getElementsByClassName('array-add-button')[0] as HTMLElement;
       var btnAdd2 : HTMLElement = document.getElementsByClassName('array-add-button')[2] as HTMLElement;
       btnAdd0.addEventListener("click", () => {
         btnAdd2.click();
       });
       
       document.querySelector('body').addEventListener('click', event => {
         var targett = event.target as HTMLElement;
         if (targett.matches('.array-remove-button')){
            var btnRemove2 : HTMLElement = document.getElementsByClassName('array-remove-button')[0] as HTMLElement;
            btnRemove2.click();
          }
       });  
   }
 };
    
 ngAfterViewInit() // validators
 {
        var input = document.getElementsByClassName('form-group');
        var inputElt;
        var inpout = ["inputs", "outputs"];

        for(let i = 0; i < 10; i++)
        {
          inputElt = input[i].getElementsByTagName("input")[0];
          document.getElementById(inputElt.id).setAttribute("autocomplete", "off");
          if (inputElt.id == "repository" || inputElt.id == "website") continue;
          inputElt.addEventListener("input", (event) => inputEventFirstCases(event, this.Schema));
          inputElt.addEventListener("focusout", function (event) {
            var spanId; 
            spanId = event.target.id + "Status";
            if (document.getElementById(spanId) != null)
              document.getElementById(spanId).remove();
          });
        }
        
        for(let i = 0; i < 2; i++)
        {
          inputElt = input[10 + i];
          inputElt.addEventListener("input", (event) => inputEventInputsOutputs(event, this.Schema, i));
          inputElt.addEventListener("focusout", function (event) {
            var spanId;
            if((new RegExp(inpout[i] +'.[0-9]+.name').test(event.target.id)) || (new RegExp(inpout[i] +'.[0-9]+.description').test(event.target.id)))
            {
              spanId = inpout[i] + "." + event.target.id.substr(7,1) + ".description" + "Status";
              if((new RegExp(inpout[i] +'.[0-9]+.name').test(event.target.id))) spanId = inpout[i] + "." + event.target.id.substr(7,1) + ".name" + "Status";
              if (document.getElementById(spanId) != null)
                document.getElementById(spanId).remove();
            }
          }); 
        }

        inputElt = input[12];
        inputElt.addEventListener("input", (event) => inputEventUi(event, this.Schema));
        inputElt.addEventListener("focusout", function (event) {
          var spanId;
          if((new RegExp('ui.[0-9]+.key').test(event.target.id)))
          {
            spanId = "ui." + event.target.id.substr(3,1) + "." + "key" + "Status";
            if (document.getElementById(spanId) != null)
              document.getElementById(spanId).remove();
          }
        });

        function inputEventFirstCases(event, Schema)
        {
          var spanElt;
          var spanId = event.target.id + "Status";
          var patt = new RegExp(Schema.properties[event.target.id].pattern);
          if (document.getElementById(spanId) == null)
          {
            spanElt = document.createElement('span');
            spanElt.setAttribute("id", spanId);
            event.target.after(spanElt);
          }
          if (patt.test((<HTMLTextAreaElement>event.target).value))
          {
            document.getElementById(spanId).textContent = "Valid";
            document.getElementById(spanId).style.color = "green";
          }
          else {
            document.getElementById(spanId).textContent = "Invalid, your input must match the pattern : " + patt;
            document.getElementById(spanId).style.color = "red";
          }
        }

        function inputEventInputsOutputs(event, Schema, i)
        {
          var spanElt;
          var spanId;
          var patt;
          var clickedTag;
          if( (new RegExp(inpout[i] +'.[0-9]+.name').test(event.target.id)) || (new RegExp(inpout[i] +'.[0-9]+.description').test(event.target.id)))
          {
            clickedTag = "description";
            if((new RegExp(inpout[i] +'.[0-9]+.name').test(event.target.id))) clickedTag = "name";
            patt = new RegExp(Schema.properties[inpout[i]]["items"].properties[clickedTag].pattern);
            spanId = inpout[i] + "." + event.target.id.substr(7,1) + "." + clickedTag + "Status";
            if (document.getElementById(spanId) == null)
            {
              spanElt = document.createElement('span');
              spanElt.setAttribute("id", spanId);
              event.target.after(spanElt);
            }
            if (patt.test((<HTMLTextAreaElement>event.target).value))
            {
              document.getElementById(spanId).textContent = "Valid";
              document.getElementById(spanId).style.color = "green";
            }
            else {
              document.getElementById(spanId).textContent = "Invalid, your input must match the pattern : " + patt;
              document.getElementById(spanId).style.color = "red";
            }
          }
        }

        function inputEventUi(event, Schema)
        {
          var spanElt;
          var spanId;
          var patt;
          if((new RegExp('ui.[0-9]+.key').test(event.target.id)))
          {
            patt = new RegExp(Schema.properties["ui"]["items"].properties["key"]["oneOf"][0].pattern);
            spanId = "ui." + event.target.id.substr(3,1) + "." + "key" + "Status";
            
            if (document.getElementById(spanId) == null)
            {
              spanElt = document.createElement('span');
              spanElt.setAttribute("id", spanId);
              event.target.after(spanElt);
            }
            if (patt.test((<HTMLTextAreaElement>event.target).value) || (<HTMLTextAreaElement>event.target).value == "fieldsets")
            {
              document.getElementById(spanId).textContent = "Valid";
              document.getElementById(spanId).style.color = "green";
            }
            else {
              document.getElementById(spanId).textContent = "Invalid, your input must match the pattern : " + patt + ", or be equal to fieldsets";
              document.getElementById(spanId).style.color = "red";
            }
          }
        }
  };


   Schema = mySchema;


  myFieldBindings = {
    '/inputs': [
      {
        'input': (event, formProperty: FormProperty) => {
          const parent: PropertyGroup = formProperty.findRoot();
          let i :number =0;
          for (const objectProperty of parent.getProperty('inputs').properties)
          {
            const idKey : string = "ui/" + i + "/blockIfPattern/key";
            const child2: FormProperty = objectProperty.properties['name'];
            const child1: FormProperty = parent.getProperty(idKey);
            child1.setValue("inputs."+child2.value, false);
            ++i;
          }
        } 
      }
    ]
  };

  open(content)
  {
   this.modalService.open(content);
   console.log("Submited clicked");
   
   this.value.properties = {
      // task name field
      'taskName': {
        'type': 'string',
        'description': 'Task name',
        'format': 'string',
        'widget': 'string',
        'placeholder': 'Enter a name for this task',
        'maxLength': 127 //- this.workflow.name.length
      },
      // job inputs fields
      'inputs': {
        'type': 'object',
        'required': [],
        'properties': {}
      }
    };
  
    try {
      // default field bindings - none
      this.value.fieldBindings = {};
      // TODO: validation of manifest ui description
      this.value.inputs.forEach(input => {
        const inputSchema = {};
        // common properties
        inputSchema['key'] = 'inputs.' + input.name;
        // inputSchema['description'] = input.description;
        if (input.required) {
          this.value.properties.inputs.required.push(input.name);
        }
        // type-specific properties
  
        switch (input.type) {
          case 'collection':
          case 'stitchingVector':
          case  'pyramidAnnotation':
          case 'pyramid':
          case 'tensorflowModel':
          case 'csvCollection':
          case 'notebook':
            inputSchema['type'] = 'string';
            inputSchema['widget'] = 'search';
            inputSchema['format'] = input.type;
            //inputSchema['getOutputs'] = () => this.jobOutputs[input.type];
            break;
          case 'enum':
            inputSchema['type'] = 'string';
            inputSchema['widget'] = 'select';
            inputSchema['oneOf'] = [];
            input.options.values.forEach(value => {
              inputSchema['oneOf'].push({
                'enum': [value],
                'description': value
              });
            });
            inputSchema['default'] = input.options.values[0];
            break;
          case 'array':
            inputSchema['type'] = 'array';
            inputSchema['format'] = 'array';
            inputSchema['items'] = input.options.items;
            break;
          // Workaround for https://github.com/guillotinaweb/ngx-schema-form/issues/332
          case 'number':
          case 'float':
            inputSchema['type'] = 'string';
            inputSchema['widget'] = 'integer';
            break;
          default:
            inputSchema['type'] = input.type;
        }
        // ui properties
        const ui = this.value.ui.find(v => v.key === inputSchema['key']);
        if (ui.hasOwnProperty('title')) {
          inputSchema['title'] = ui.title;
        }
        if (ui.hasOwnProperty('description')) {
          inputSchema['placeholder'] = ui.description;
        }
        if (ui.hasOwnProperty('condition')) {
          inputSchema['condition'] = ui.condition;
          const conditionElements = ui.condition.split('==');
          if (conditionElements.length === 2) {
            const inputName = conditionElements[0].split('.');
            if (inputName.length > 0) {
              inputSchema['visibleIf'] = {};
              inputSchema['visibleIf'][inputName[inputName.length - 1]] = conditionElements[1];
            }
          }
        }
        // hidden fields
        if (ui.hasOwnProperty('hidden') && ui.hidden === true) {
          inputSchema['widget'] = 'hidden';
        }
        // custom bindings - update value of target input from value of source input
        if (ui.hasOwnProperty('bind')) {
          const sourceField = '/inputs/' + ui.bind;
          const targetField = ui['key'].split('.').join('/');
          this.value.fieldBindings[sourceField] = [
            {
              'input': (event, formProperty: FormProperty) => {
                const parent: PropertyGroup = formProperty.findRoot();
                const target: FormProperty = parent.getProperty(targetField);
  
                target.setValue(formProperty.value, false);
              }
            }
          ];
        }
        if (ui.hasOwnProperty('default')) {
          inputSchema['default'] = ui.default;
        }
        this.value.properties.inputs.properties[input.name] = inputSchema;
      });
      // field sets - arrange fields by groups
      const fieldsetsList = this.value.ui.find(v => v.key === 'fieldsets');
      if (fieldsetsList) {
        this.value.properties.inputs.fieldsets = fieldsetsList.fieldsets;
      }
      this.value.isSchemaValid = true;
    } catch (error) {
      console.log(error);
      this.value.properties = {};
      this.value.isSchemaValid = false;
    }
  }
}

