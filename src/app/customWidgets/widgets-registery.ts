  
import { DefaultWidgetRegistry } from 'ngx-schema-form';
import { ArrayWidgetComponent } from './array-widget/array-widget.component';
import { BooleanWidgetComponent } from './boolean-widget/boolean-widget.component';
import { IntegerWidgetComponent } from './integer-widget/integer-widget.component';
import { ObjectWidgetComponent } from './object-widget/object-widget.component';
import { StringWidgetComponent } from './string-widget/string-widget.component';

export class WidgetsRegistry extends DefaultWidgetRegistry {
  constructor() {
    super();

    this.register('customString', StringWidgetComponent);
    this.register('customArray', ArrayWidgetComponent);
    this.register('customObject', ObjectWidgetComponent);
    this.register('customBoolean', BooleanWidgetComponent);
    this.register('customInteger', IntegerWidgetComponent);
    
  }
}