import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SchemaFormModule, WidgetRegistry } from "ngx-schema-form";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StringWidgetComponent } from './customWidgets/string-widget/string-widget.component';
import { WidgetsRegistry } from './customWidgets/widgets-registery';
import { CommonModule } from '@angular/common';
import { ArrayWidgetComponent } from './customWidgets/array-widget/array-widget.component';
import { ObjectWidgetComponent } from './customWidgets/object-widget/object-widget.component';
import { BooleanWidgetComponent } from './customWidgets/boolean-widget/boolean-widget.component';
import { IntegerWidgetComponent } from './customWidgets/integer-widget/integer-widget.component';
import { ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent, StringWidgetComponent, ArrayWidgetComponent, ObjectWidgetComponent, BooleanWidgetComponent, IntegerWidgetComponent
  ],
  imports: [
    SchemaFormModule.forRoot(),
    ReactiveFormsModule,
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [{provide: WidgetRegistry, useClass: WidgetsRegistry}],
  bootstrap: [AppComponent],
  exports: [AppComponent]
})
export class AppModule { }
