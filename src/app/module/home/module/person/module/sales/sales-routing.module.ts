import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SalesComponent } from "./sales.component";

const ROUTES: Routes = [
    {
        path: "",
        component: SalesComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class SalesRoutingModule {}
