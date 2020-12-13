import { Component } from '@angular/core';
import { FormProperty, PropertyGroup } from 'ngx-schema-form';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  mySchema = 
  {
               "type": "object",
               "title": "Example of a form",
               "description": "Fill out the names of a family members.",
               "properties": {
                 "name": {
                   "type": "string",
                   "title": "Surname"
                 },
                 "forename": {
                   "type": "string",
                   "title": "Forename"
                 },
                 "children": {
                   "type": "array",
                   "title": "Family",
                   "items": {
                     "type": "object",
                     "title": "Children",
                     "properties": {
                       "name": {
                         "type": "string",
                         "title": "Surname"
                       },
                       "forename": {
                         "type": "string",
                         "title": "forename"
                       },
                       "age": {
                         "type": "number",
                         "title": "age"
                       }
                     }
                   }
                 }
               }
             }

  // Declare a mapping between field and event-id
  myFieldBindings = {
      '/name': [
        {
          'input': (event, formProperty: FormProperty) => {
            const parent: PropertyGroup = formProperty.findRoot();

            /**
             * Set the input value for the children
             */
            const child1: FormProperty = parent.getProperty('children/0/name');

            child1.setValue(formProperty.value, false);

            const child2: FormProperty = parent.getProperty('children/1/name');
            child2.setValue(event.target.value, false);

            /**
             * Get the input value for all the children
             */
            for (const objectProperty of parent.getProperty('children').properties) {
              console.log('Value for child ', objectProperty, objectProperty.properties['name'].value);
            }
          }
        }
      ]
    };
}

