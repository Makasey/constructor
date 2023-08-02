import { AboutModule } from "./module/about/about.module";
import { BuyoutModule } from "./module/buyout/buyout.module";
import { DeliveryModule } from "./module/delivery/delivery.module";
import { InfoComponent } from "./info.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const ROUTES: Routes = [
    {
        path: "",
        component: InfoComponent,
        children: [
            {
                path: "",
                pathMatch: "full",
                redirectTo: "about",
            },
            {
                path: "about",
                loadChildren: (): Promise<typeof AboutModule> => import("./module/about/about.module").then(module => module.AboutModule),
            },
            {
                path: "buyout",
                loadChildren: (): Promise<typeof BuyoutModule> => import("./module/buyout/buyout.module").then(module => module.BuyoutModule),
            },
            {
                path: "delivery",
                loadChildren: (): Promise<typeof DeliveryModule> => import("./module/delivery/delivery.module").then(module => module.DeliveryModule),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class InfoRoutingModule {}
