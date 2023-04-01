import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { NotifiationsComponent } from "./notifiations.component";


const ROUTES: Routes = [
    {
        path: "",
        component: NotifiationsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class NotifiationsRoutingModule {}
