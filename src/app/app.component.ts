import { Component } from '@angular/core';
import { FormProperty, PropertyGroup } from 'ngx-schema-form';
import { ButtonComponent } from 'ngx-schema-form/lib/template-schema/button/button.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 value: any;

 
 ngOnInit() // bindings
 {  
   window.onload = () => {
       var btnAdd0 : HTMLElement = document.getElementsByClassName('array-add-button')[0] as HTMLElement;
       var btnAdd2 : HTMLElement = document.getElementsByClassName('array-add-button')[2] as HTMLElement;
       btnAdd0.addEventListener("click", () => {
         btnAdd2.click();
       });
       /*var btnRemove0 : HTMLElement = document.getElementsByClassName('array-remove-button')[0] as HTMLElement;
       var btnRemove2 : HTMLElement = document.getElementsByClassName('array-remove-button')[2] as HTMLElement;
       btnRemove0.addEventListener("click", () => {
         btnRemove2.click();
         alert("clicked!");
       });*/
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
          inputElt.addEventListener("input", (event) => inputEventFirstCases(event, this.mySchema));
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
          inputElt.addEventListener("input", (event) => inputEventInputsOutputs(event, this.mySchema, i));
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
        inputElt.addEventListener("input", (event) => inputEventUi(event, this.mySchema));
        inputElt.addEventListener("focusout", function (event) {
          var spanId;
          if((new RegExp('ui.[0-9]+.key').test(event.target.id)))
          {
            spanId = "ui." + event.target.id.substr(3,1) + "." + "key" + "Status";
            if (document.getElementById(spanId) != null)
              document.getElementById(spanId).remove();
          }
        });

        function inputEventFirstCases(event, mySchema)
        {
          var spanElt;
          var spanId = event.target.id + "Status";
          var patt = new RegExp(mySchema.properties[event.target.id].pattern);
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

        function inputEventInputsOutputs(event, mySchema, i)
        {
          var spanElt;
          var spanId;
          var patt;
          var clickedTag;
          if( (new RegExp(inpout[i] +'.[0-9]+.name').test(event.target.id)) || (new RegExp(inpout[i] +'.[0-9]+.description').test(event.target.id)))
          {
            clickedTag = "description";
            if((new RegExp(inpout[i] +'.[0-9]+.name').test(event.target.id))) clickedTag = "name";
            patt = new RegExp(mySchema.properties[inpout[i]]["items"].properties[clickedTag].pattern);
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

        function inputEventUi(event, mySchema)
        {
          var spanElt;
          var spanId;
          var patt;
          if((new RegExp('ui.[0-9]+.key').test(event.target.id)))
          {
            patt = new RegExp(mySchema.properties["ui"]["items"].properties["key"]["oneOf"][0].pattern);
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


mySchema = 
{
  "$schema":"http://json-schema.org/draft-07/schema#",
  "$id":"https://raw.githubusercontent.com/usnistgov/WIPP-Plugins-base-templates/master/plugin-manifest/schema/wipp-plugin-manifest-schema.json",
  "type":"object",
  "title":"WIPP Plugin manifest",
  "default":null,
  "required":[
     "name",
     "version",
     "title",
     "description",
     "containerId",
     "inputs",
     "outputs",
     "ui"
  ],
  "properties":{
     "name":{
        "$id":"#/properties/name",
        "type":"string",
        "title":"Name of the plugin",
        "default":"",
        "examples":[
           "My Awesome Plugin"
        ],
        "minLength":1,
        "pattern":"^(.*)$"
     },
     "version":{
        "$id":"#/properties/version",
        "type":"string",
        "title":"Plugin version",
        "default":"",
        "examples":[
           "1.0.0"
        ],
        "minLength":1,
        "pattern":"^(.*)$"
     },
     "title":{
        "$id":"#/properties/title",
        "type":"string",
        "title":"Plugin title",
        "default":"",
        "examples":[
           "My really awesome plugin"
        ],
        "minLength":1,
        "pattern":"^(.*)$"
     },
     "description":{
        "$id":"#/properties/description",
        "type":"string",
        "title":"Description",
        "default":"",
        "examples":[
           "My awesome segmentation algorithm"
        ],
        "minLength":1,
        "pattern":"^(.*)$"
     },
     "author":{
        "$id":"#/properties/author",
        "type":"string",
        "title":"Author(s)",
        "default":"",
        "examples":[
           "FirstName LastName"
        ],
        "pattern":"^(.*)$"
     },
     "institution":{
        "$id":"#/properties/institution",
        "type":"string",
        "title":"Institution",
        "default":"",
        "examples":[
           "National Institute of Standards and Technology"
        ],
        "pattern":"^(.*)$"
     },
     "repository":{
        "$id":"#/properties/repository",
        "type":"string",
        "title":"Source code repository",
        "default":"",
        "examples":[
           "https://github.com/usnistgov/WIPP"
        ],
        "format":"uri"
     },
     "website":{
        "$id":"#/properties/website",
        "type":"string",
        "title":"Website",
        "default":"",
        "examples":[
           "http://usnistgov.github.io/WIPP"
        ],
        "format":"uri"
     },
     "citation":{
        "$id":"#/properties/citation",
        "type":"string",
        "title":"Citation",
        "default":"",
        "examples":[
           "Peter Bajcsy, Joe Chalfoun, and Mylene Simon (2018). Web Microanalysis of Big Image Data. Springer-Verlag International"
        ],
        "pattern":"^(.*)$"
     },
     "containerId":{
        "$id":"#/properties/containerId",
        "type":"string",
        "title":"ContainerId",
        "placeholder":"Docker image ID",
        "default":"",
        "examples":[
           "wipp/example-plugin:1.0.0"
        ],
        "pattern":"^(.*)$"
     },
     "inputs":{
        "$id":"#/properties/inputs",
        "type":"array",
        "title":"List of Inputs",
        "placeholder":"Defines inputs to the plugin",
        "default":null,
        "uniqueItems":true,
        "items":{
           "$id":"#/properties/inputs/items",
           "type":"object",
           "title":"Input",
           "description":"Plugin input",
           "default":null,
           "required":[
              "name",
              "type",
              "description"
           ],
           "properties":{
              "name":{
                 "$id":"#/properties/inputs/items/properties/name",
                 "type":"string",
                 "title":"Input name",
                 "placeholder":"Input name as expected by the plugin CLI",
                 "default":"",
                 "examples":[
                    "inputImages",
                    "fileNamePattern",
                    "thresholdValue"
                 ],
                 "pattern":"^[a-zA-Z0-9][-a-zA-Z0-9]*$"
              },
              "type":{
                 "$id":"#/properties/inputs/items/properties/type",
                 "type":"string",
                 "widget":{
                    "id":"select"
                 },
                 "enum":[
                    "collection",
                    "stitchingVector",
                    "tensorflowModel",
                    "csvCollection",
                    "pyramid",
                    "notebook",
                    "string",
                    "number",
                    "integer",
                    "enum",
                    "array",
                    "boolean"
                 ],
                 "title":"Input Type",
                 "examples":[
                    "collection",
                    "string",
                    "number"
                 ],
                 "required":true
              },
              "description":{
                 "$id":"#/properties/inputs/items/properties/description",
                 "type":"string",
                 "title":"Input description",
                 "examples":[
                    "Input Images"
                 ],
                 "pattern":"^(.*)$"
              },
              "required":{
                 "$id":"#/properties/inputs/items/properties/required",
                 "type":"boolean",
                 "title":"Required input",
                 "description":"Whether an input is required or not",
                 "default":true,
                 "examples":[
                    true
                 ]
              }
           }
        }
     },
     "outputs":{
        "$id":"#/properties/outputs",
        "type":"array",
        "title":"List of Outputs",
        "description":"Defines the outputs of the plugin",
        "default":null,
        "items":{
           "$id":"#/properties/outputs/items",
           "type":"object",
           "title":"Plugin output",
           "default":null,
           "required":[
              "name",
              "type",
              "description"
           ],
           "properties":{
              "name":{
                 "$id":"#/properties/outputs/items/properties/name",
                 "type":"string",
                 "title":"Output name",
                 "default":"",
                 "examples":[
                    "outputCollection"
                 ],
                 "pattern":"^[a-zA-Z0-9][-a-zA-Z0-9]*$"
              },
              "type":{
                 "$id":"#/properties/outputs/items/properties/type",
                 "type":"string",
                 "widget":{
                    "id":"select"
                 },
                 "enum":[
                    "collection",
                    "stitchingVector",
                    "tensorflowModel",
                    "tensorboardLogs",
                    "csvCollection",
                    "pyramid"
                 ],
                 "title":"Output type",
                 "examples":[
                    "stitchingVector",
                    "collection"
                 ]
              },
              "description":{
                 "$id":"#/properties/outputs/items/properties/description",
                 "type":"string",
                 "title":"Output description",
                 "examples":[
                    "Output collection"
                 ],
                 "pattern":"^(.*)$"
              }
           }
        }
     },
     "ui":{
        "$id":"#/properties/ui",
        "type":"array",
        "title":"Plugin form UI definition",
        "items":{
           "type":"object",
           "title":"List of UI definitions",
           "required":[
              "key"
           ],
           "properties":{
              "typeOfUi":{
                "type":"string",
                "title":"UI type",
                "default":"^inputs\\.[a-zA-Z0-9][-a-zA-Z0-9]*$",
                "widget":{
                  "id":"select"
                },
                "oneOf":[
                   {
                      "enum":[
                         "^inputs\\.[a-zA-Z0-9][-a-zA-Z0-9]*$"
                      ],
                      "description":"input"
                   },
                   {
                      "enum":[
                         "fieldsets"
                      ],
                      "description":"fieldsets"
                   }
                ]

              },
              "blockIfPattern":{
                 "type":"object",
                 "required":[
                    "title"
                 ],
                 "visibleIf":{
                    "typeOfUi":[
                       "^inputs\\.[a-zA-Z0-9][-a-zA-Z0-9]*$"
                    ]
                 },
                 "properties":{
                    "key":{
                      "$id":"#/properties/ui/items/properties/key",
                      "type":"string",
                      "title":"UI key ",
                      "description":"Key of the input which this UI definition applies to, the expected format is 'inputs.inputName'. Special keyword 'fieldsets' can be used to define arrangement of inputs by sections.",
                      "examples":[
                         "inputs.inputImages",
                         "inputs.fileNamPattern",
                         "fieldsets"
                      ],
                      "pattern": "^inputs\\.[a-zA-Z0-9][-a-zA-Z0-9]*$"
                    },
                    "title":{
                       "$id":"#/properties/ui/items/properties/title",
                       "type":"string",
                       "title":"Input label",
                       "default":"",
                       "examples":[
                          "Input images: "
                       ],
                       "pattern":"^(.*)$"
                    },
                    "description":{
                       "$id":"#/properties/ui/items/properties/description",
                       "type":"string",
                       "title":"Input placeholder",
                       "default":"",
                       "examples":[
                          "Pick a collection..."
                       ],
                       "pattern":"^(.*)$"
                    },
                    "condition":{
                       "$id":"#/properties/ui/items/properties/condition",
                       "type":"string",
                       "title":"Input visibility condition",
                       "description":"Definition of when this field is visible or not, depending on the value of another input, the expected format for the condition is 'model.inputs.inputName==value'",
                       "default":"",
                       "examples":[
                          "model.inputs.thresholdtype=='Manual'"
                       ],
                       "pattern":"^(.*)$"
                    },
                    "hidden":{
                       "$id":"#/properties/ui/items/properties/hidden",
                       "type":"boolean",
                       "title":"Hidden input",
                       "description":"Hidden input will not be displayed on the form, but can be used in conjunction with the 'default' or 'bind' properties to define default or automatically set parameters",
                       "default":false,
                       "examples":[
                          true,
                          false
                       ]
                    },
                    "bind":{
                       "$id":"#/properties/ui/items/properties/bind",
                       "type":"string",
                       "title":"Bind input value to another input",
                       "examples":[
                          "gridWidth"
                       ]
                    }
                 }
              },
              "blockIfFieldsets":{
                 "type":"object",
                 "required":[
                    "fiedsets"
                 ],
                 "visibleIf":{
                    "typeOfUi":[
                       "fieldsets"
                    ]
                 },
                 "properties":{
                    "fieldsets":{
                       "description":"A list of definitions representing sections of input fields.",
                       "type":"array",
                       "items":{
                          "description":"A section of input fields.",
                          "type":"object",
                          "properties":{
                             "title":{
                                "type":"string",
                                "description":"The label of the section.",
                                "examples":[
                                   "Input images selection"
                                ]
                             },
                             "fields":{
                                "description":"A list of input names representing input fields that belong to this section.",
                                "type":"array",
                                "items":{
                                   "type":"string"
                                },
                                "uniqueItems":true,
                                "minItems":1,
                                "examples":[
                                   "inputImages, fileNamePattern"
                                ]
                             }
                          },
                          "uniqueItems":true,
                          "default":[
                             
                          ],
                          "minItems":1,
                          "required":[
                             "title",
                             "fields"
                          ]
                       }
                    }
                 }
              }
           }
        }
     }
  }
};


  myFieldBindings = {
    '/inputs': [
      {
        'input': (event, formProperty: FormProperty) => {
<<<<<<< HEAD

=======
>>>>>>> 05412c0bb1b27618c8c5e55d2fd493d2bba1bf46
          const parent: PropertyGroup = formProperty.findRoot();
          let i :number =0;
          for (const objectProperty of parent.getProperty('inputs').properties)
          {
            const idKey : string = "ui/" + i + "/blockIfPattern/key";
            const child2: FormProperty = objectProperty.properties['name'];
            const child1: FormProperty = parent.getProperty(idKey);
<<<<<<< HEAD
            child1.setValue("inputs."+child2.value, false);
=======
            child1.setValue("inputs." + child2.value, false);
>>>>>>> 05412c0bb1b27618c8c5e55d2fd493d2bba1bf46
            ++i;
          }
        } 
      }
    ]
  };
}

