import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { OrdersComponent } from "./orders.component";
import { OrdersService } from "./orders.service";
import { StatusModule } from "../status";
import { TableModule } from "../table";

@NgModule({
    declarations: [OrdersComponent],
    exports: [OrdersComponent],
    imports: [CommonModule, TableModule, StatusModule],
    providers: [OrdersService],
})
export class OrdersModule {}
