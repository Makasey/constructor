import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { OrdersComponent } from "./orders.component";
import { OrdersService } from "./orders.service";
import { StatusModule } from "../../ui/status";
import { TableModule } from "../../ui/table";

@NgModule({
    declarations: [OrdersComponent],
    exports: [OrdersComponent],
    imports: [CommonModule, TableModule, StatusModule],
    providers: [OrdersService],
})
export class OrdersModule {}
