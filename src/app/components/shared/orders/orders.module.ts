import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { OrdersComponent } from "./orders.component";
import { OrdersService } from "./orders.service";
import { StatusModule, TableModule } from "@components/ui";

@NgModule({
    declarations: [OrdersComponent],
    exports: [OrdersComponent],
    imports: [CommonModule, StatusModule, TableModule],
    providers: [OrdersService],
})
export class OrdersModule {}
