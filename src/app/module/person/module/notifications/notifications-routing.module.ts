import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { NotificationsComponent } from "./notifications.component";


const ROUTES: Routes = [
    {
        path: "",
        component: NotificationsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class NotificationsRoutingModule {}
