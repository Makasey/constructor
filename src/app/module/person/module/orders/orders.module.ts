import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { OrdersComponent } from "./orders.component";
import { OrdersRoutingModule } from "./orders-routing.module";


@NgModule({
    declarations: [
        OrdersComponent,
    ],
    imports: [
        CommonModule,
        OrdersRoutingModule,
    ],
})
export class OrdersModule { }
