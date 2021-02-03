export const mySchema = {
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
         "pattern":"^(.*)$",
         "widget":'customString'
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
         "pattern":"^(.*)$",
         "widget":'customString'
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
         "pattern":"^(.*)$",
         "widget":'customString'
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
         "pattern":"^(.*)$",
         "widget":'customString'
      },
      "author":{
         "$id":"#/properties/author",
         "type":"string",
         "title":"Author(s)",
         "default":"",
         "examples":[
            "FirstName LastName"
         ],
         "pattern":"^(.*)$",
         "widget":'customString'
      },
      "institution":{
         "$id":"#/properties/institution",
         "type":"string",
         "title":"Institution",
         "default":"",
         "examples":[
            "National Institute of Standards and Technology"
         ],
         "pattern":"^(.*)$",
         "widget":'customString'
      },
      "repository":{
         "$id":"#/properties/repository",
         "type":"string",
         "title":"Source code repository",
         "default":"",
         "examples":[
            "https://github.com/usnistgov/WIPP"
         ],
         "format":"uri",
         "widget":'customString'
      },
      "website":{
         "$id":"#/properties/website",
         "type":"string",
         "title":"Website",
         "default":"",
         "examples":[
            "http://usnistgov.github.io/WIPP"
         ],
         "format":"uri",
         "widget":'customString'
      },
      "citation":{
         "$id":"#/properties/citation",
         "type":"string",
         "title":"Citation",
         "default":"",
         "examples":[
            "Peter Bajcsy, Joe Chalfoun, and Mylene Simon (2018). Web Microanalysis of Big Image Data. Springer-Verlag International"
         ],
         "pattern":"^(.*)$",
         "widget":'customString'
      },
      "containerId":{
         "$id":"#/properties/containerId",
         "type":"string",
         "title":"ContainerId",
         "description":"Docker image ID",
         "widget":'customString',
         "default":"",
         "examples":[
            "wipp/example-plugin:1.0.0"
         ],
         "pattern":"^(.*)$"
      },
      "inputs":{
         "$id":"#/properties/inputs",
         "type":"array",
         "widget":'customArray',
         "title":"List of Inputs",
         "description":"Defines inputs to the plugin",
         "default":null,
         "uniqueItems":true,
         "items":{
            "$id":"#/properties/inputs/items",
            "type":"object",
            "widget":'customObject',
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
                  "description":"Input name as expected by the plugin CLI",
                  "default":"",
                  "widget":'customString',
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
               "options":{
                  "$id":"#/properties/inputs/items/properties/options",
                  "type":"object",
                  "widget":'customObject',
                  "title":"Input options",
                  "visibleIf": {},
                  "properties":{
                     "values":{
                        "type":"array",
                        "description":"List of possible values",
                        "widget":'customArray',
                        "items":{
                           "type":"string"
                        },
                        "uniqueItems":true
                     },
                     
                     "items":{
                        "$id":"#/properties/inputs/items/properties/options/properties/items",
                        "type":"object",
                        "widget":'customObject',
                        "title":"List of array items",
                        "description":"Possible values for the input array",
                        "default":{
                           
                        },
                    
                        "required":[
                           "type",
                           "title",
                           "oneOf",
                           "default",
                           "widget",
                           "minItems",
                           "uniqueItems"
                        ],
                        "properties":{
                           "type":{
                              "$id":"#/properties/inputs/items/properties/options/properties/items/properties/type",
                              "type":"string",
                              "widget":'customString',
                              "title":"Items type",
                              "description":"Type of the items to be selected",
                              "enum":[
                                 "string"
                              ],
                              "examples":[
                                 "string"
                              ]
                           },
                           "title":{
                              "$id":"#/properties/inputs/items/properties/options/properties/items/properties/title",
                              "type":"string",
                              "widget":'customString',
                              "title":"Selection title",
                              "description":"Title of the item selection section in the form",
                              "default":"",
                              "examples":[
                                 "Select feature"
                              ]
                           },
                           "oneOf":{
                              "$id":"#/properties/inputs/items/properties/options/properties/items/properties/oneOf",
                              "type":"array",
                              "widget":'customArray',
                              "title":"Possible items",
                              "description":"List of possible items",
                              "default":[
                                 
                              ],
                              "items":{
                                 "$id":"#/properties/inputs/items/properties/options/properties/items/properties/oneOf/items",
                                 "type":"object",
                                 "widget":'customObject',
                                 "title":"Items definition",
                                 "description":"Description of the possible items",
                                 "default":{
                                    
                                 },
                                 "required":[
                                    "description",
                                    "enum"
                                 ],
                                 "properties":{
                                    "description":{
                                       "$id":"#/properties/inputs/items/properties/options/properties/items/properties/oneOf/items/properties/description",
                                       "type":"string",
                                       "widget":'customString',
                                       "title":"Description",
                                       "description":"Description of the value that will appear in the form",
                                       "default":"",
                                       "examples":[
                                          "Area"
                                       ]
                                    },
                                    "enum":{
                                       "$id":"#/properties/inputs/items/properties/options/properties/items/properties/oneOf/items/properties/enum",
                                       "type":"array",
                                       "widget":'customArray',
                                       "title":"Value",
                                       "description":"Values of the selected item",
                                       "default":[
                                          
                                       ],
                                       "items":{
                                          "$id":"#/properties/inputs/items/properties/options/properties/items/properties/oneOf/items/properties/enum/items",
                                          "type":"string",
                                          "widget":'customString',
                                          "title":"List of values",
                                          "description":"List of values associated with the selected item (usually one value)",
                                          "default":"",
                                          "examples":[
                                             "Feature2DJava_Area"
                                          ]
                                       }
                                    }
                                 },
                                 "examples":[
                                    {
                                       "description":"Area",
                                       "enum":[
                                          "Feature2DJava_Area"
                                       ]
                                    },
                                    {
                                       "enum":[
                                          "Feature2DJava_Mean"
                                       ],
                                       "description":"Mean"
                                    }
                                 ]
                              }
                           },
                           "default":{
                              "$id":"#/properties/inputs/items/properties/options/properties/items/properties/default",
                              "type":"string",
                              "widget":'customString',
                              "title":"Default value",
                              "description":"Value selected by default (must be one of the possible values)",
                              "default":"",
                              "examples":[
                                 "Feature2DJava_Area"
                              ]
                           },
                           "widget":{
                              "$id":"#/properties/inputs/items/properties/options/properties/items/properties/widget",
                              "type":"string",
                              "widget":'customString',
                              "title":"Item selection widget",
                              "description":"How items can be selected (select -> dropdown list with add/remove buttons, checkbox -> multi-selection from list)",
                              "enum":[
                                 "select",
                                 "checkbox"
                              ],
                              "examples":[
                                 "select"
                              ]
                           },
                           "minItems":{
                              "$id":"#/properties/inputs/items/properties/options/properties/items/properties/minItems",
                              "type":"integer",
                              "widget":'customInteger',
                              "title":"Minumum number of items",
                              "description":"Minumum number of items",
                              "default":0,
                              "examples":[
                                 1
                              ]
                           },
                           "uniqueItems":{
                              "$id":"#/properties/inputs/items/properties/options/properties/items/properties/uniqueItems",
                              "type":"string",
                              "widget":'customString',
                              "title":"Uniqueness of the items",
                              "description":"Whether items in the array have to be unique",
                              "examples":[
                                 "true",
                                 true
                              ]
                           }
                        },
                        "examples":[
                           {
                              "type":"string",
                              "widget":"select",
                              "uniqueItems":"true",
                              "default":"Feature2DJava_Area",
                              "minItems":1,
                              "title":"Select feature",
                              "oneOf":[
                                 {
                                    "description":"Area",
                                    "enum":[
                                       "Feature2DJava_Area"
                                    ]
                                 },
                                 {
                                    "description":"Mean",
                                    "enum":[
                                       "Feature2DJava_Mean"
                                    ]
                                 }
                              ]
                           }
                        ]
                     }
                  }
               },
               "description":{
                  "$id":"#/properties/inputs/items/properties/description",
                  "type":"string",
                  "title":"Input description",
                  "examples":[
                     "Input Images"
                  ],
                  "pattern":"^(.*)$",
                  "widget":'customString'
               },
               "required":{
                  "$id":"#/properties/inputs/items/properties/required",
                  "type":"boolean",
                  "widget":'customBoolean',
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
         "widget":'customArray',
         "title":"List of Outputs",
         "description":"Defines the outputs of the plugin",
         "default":null,
         "items":{
            "$id":"#/properties/outputs/items",
            "type":"object",
            "widget":'customObject',
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
                  "pattern":"^[a-zA-Z0-9][-a-zA-Z0-9]*$",
                  "widget":'customString'
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
                  "pattern":"^(.*)$",
                  "widget":'customString'
               }
            }
         }
      },
      "ui":{
         "$id":"#/properties/ui",
         "type":"array",
         "widget":'customArray',
         "title":"Plugin form UI definition",
         "items":{
            "type":"object",
            "title":"List of UI definitions",
            "widget":'customObject',
            "required":[
               "key",
               "title"
            ],
            "properties":{
               "key":{
                  "$id":"#/properties/ui/items/properties/key",
                  "type":"string",
                  "title":"UI key",
                  "widget":'customString',
                  "description":"Key of the input which this UI definition applies to, the expected format is 'inputs.inputName'. Special keyword 'fieldsets' can be used to define arrangement of inputs by sections.",
                  "examples":[
                     "inputs.inputImages",
                     "inputs.fileNamPattern",
                     "fieldsets"
                  ],
                  "pattern":"^inputs\\.[a-zA-Z0-9][-a-zA-Z0-9]*$"
               },
               "title":{
                  "$id":"#/properties/ui/items/properties/title",
                  "type":"string",
                  "title":"Input label",
                  "default":"",
                  "examples":[
                     "Input images: "
                  ],
                  "pattern":"^(.*)$",
                  "widget":'customString'
               },
               "description":{
                  "$id":"#/properties/ui/items/properties/description",
                  "type":"string",
                  "title":"Input placeholder",
                  "default":"",
                  "examples":[
                     "Pick a collection..."
                  ],
                  "pattern":"^(.*)$",
                  "widget":'customString'
               },
               "condition":{
                  "$id":"#/properties/ui/items/properties/condition",
                  "type":"string",
                  "widget":'customString',
                  "title":"Input visibility condition",
                  "description":"Definition of when this field is visible or not, depending on the value of another input, the expected format for the condition is 'model.inputs.inputName==value'",
                  "default":"",
                  "examples":[
                     "model.inputs.thresholdtype=='Manual'"
                  ],
                  "pattern":"^(.*)$"
               },
               "default":{
                  "$id":"#/properties/ui/items/properties/default",
                  "type":"string",
                  "title":"Input default value",
                  "default":"",
                  "examples":[
                     5,
                     false,
                     ".ome.tif"
                  ],
                  "widget":'customString'
               },
               "hidden":{
                  "$id":"#/properties/ui/items/properties/hidden",
                  "type":"boolean",
                  "widget":'customBoolean',
                  "title":"Hidden input",
                  "description":"Hidden input will not be displayed on the form, but can be used in conjunction with the 'default' or 'bind' properties to define default or automatically set parameters",
                  "default":false,
                  "examples":[
                     true,
                     false
                  ],
                  "widget":'customString'
               },
               "bind":{
                  "$id":"#/properties/ui/items/properties/bind",
                  "type":"string",
                  "title":"Bind input value to another input",
                  "examples":[
                     "gridWidth"
                  ],
                  "widget":'customString'
               }
            }
         }
      }
   }
}

