import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SchemaFormModule, WidgetRegistry, DefaultWidgetRegistry } from "ngx-schema-form";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SchemaFormModule.forRoot(),
    BrowserModule,
    AppRoutingModule
  ],
  providers: [{provide: WidgetRegistry, useClass: DefaultWidgetRegistry}],
  bootstrap: [AppComponent]
})
export class AppModule { }
