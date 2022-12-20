import { AkitaNgDevtools } from "@datorama/akita-ngdevtools";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserModule } from "@angular/platform-browser";
import { CheckboxGroupModule } from "./components/checkbox-group/checkbox-group.module";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { OrdersModule } from "./components/orders/orders.module";
import { PreloadDirectiveModule } from "./directive";
import { ColorPickerModule } from "./components/color-picker/color-picker.module";

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, OrdersModule, CheckboxGroupModule,ColorPickerModule, HttpClientModule, AkitaNgDevtools.forRoot(), PreloadDirectiveModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
