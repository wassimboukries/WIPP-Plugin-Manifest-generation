import { Component } from '@angular/core';
import { FormProperty, PropertyGroup } from 'ngx-schema-form';
import {mySchema} from './WIPP schema.js';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NgbModalConfig, NgbModal]
})


export class AppComponent {
 value: any;
 Schema = mySchema;
 
 constructor(config: NgbModalConfig, private modalService: NgbModal) {
   config.backdrop = 'static';
   config.keyboard = false;
   
 }
 
 ngAfterViewInit() {
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
         
   };

  myFieldBindings = {
    '/inputs': [
      {
        'input': (event, formProperty: FormProperty) => {
          const parent: PropertyGroup = formProperty.findRoot();
          let i :number =0;
          for (const objectProperty of parent.getProperty('inputs').properties)
          {
            const idKey : string = "ui/" + i + "/key";
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

