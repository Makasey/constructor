import { DeliveryComponent } from "./delivery.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const ROUTES: Routes = [
    {
        path: "",
        component: DeliveryComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class DeliveryRoutingModule {}
