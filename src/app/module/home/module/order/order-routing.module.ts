import { NgModule } from "@angular/core";
import { OrderComponent } from "./order.component";
import { Route, RouterModule } from "@angular/router";

const ROUTES: Route[] = [
    {
        path: "",
        component: OrderComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class OrderRoutingModule {}
