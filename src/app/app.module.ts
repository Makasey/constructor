import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {TableModule} from "./components/table/table.module";
import {OrdersModule} from "./components/orders/orders.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableModule,
    OrdersModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
}
