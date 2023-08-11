import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { OrdersComponent } from "./orders.component";
import { OrdersService } from "./orders.service";
import { Route, RouterModule } from "@angular/router";
import { StatusModule, TableModule } from "@components/ui";

const ROUTES: Route[] = [
    {
        path: "",
        component: OrdersComponent,
    },
];

@NgModule({
    declarations: [OrdersComponent],
    exports: [OrdersComponent, RouterModule],
    imports: [CommonModule, StatusModule, TableModule, RouterModule.forChild(ROUTES)],
    providers: [OrdersService],
})
export class OrdersModule {}
