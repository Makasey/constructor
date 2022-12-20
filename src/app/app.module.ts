import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserModule } from "@angular/platform-browser";
import { CheckboxGroupModule } from "./components/checkbox-group/checkbox-group.module";
import { NgModule } from "@angular/core";
import { OrdersModule } from "./components/orders/orders.module";
import { ColorPickerModule } from "./components/color-picker/color-picker.module";

@NgModule({
    declarations: [AppComponent],
    imports: [
      BrowserModule,
      AppRoutingModule,
      OrdersModule,
      CheckboxGroupModule,
      ColorPickerModule
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
