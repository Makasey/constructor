import { NgModule } from "@angular/core";
import { OrdersComponent } from "./orders.component";
import { RouterModule, Routes } from "@angular/router";

const ROUTES: Routes = [
    {
        path: "",
        component: OrdersComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class OrdersRoutingModule {}
