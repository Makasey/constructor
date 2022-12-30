import { BuyoutComponent } from "./buyout.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const ROUTES: Routes = [
    {
        path: "",
        component: BuyoutComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class BuyoutRoutingModule {}
