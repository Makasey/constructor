import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { OrdersModule } from "./components/orders/orders.module";
import { CheckboxGroupModule } from "./components/checkbox-group/checkbox-group.module";

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, OrdersModule, CheckboxGroupModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
