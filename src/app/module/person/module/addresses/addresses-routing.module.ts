import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddressesComponent } from "./addresses.component";

const ROUTES: Routes = [
    {
        path: "",
        component: AddressesComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class AddressesRoutingModule {}
