import { AddressesModule } from "./module/addresses/addresses.module";
import { NgModule } from "@angular/core";
import { OrdersModule } from "./module/orders/orders.module";
import { PersonComponent } from "./person.component";
import { RouterModule, Routes } from "@angular/router";
import { SalesModule } from "./module/sales/sales.module";
import { SettingsModule } from "./module/settings/settings.module";

const routes: Routes = [
    {
        path: "",
        component: PersonComponent,
        children: [
            {
                path: "",
                pathMatch: "full",
                redirectTo: "orders",
            },
            {
                path: "addresses",
                loadChildren: (): Promise<typeof AddressesModule> => import("./module/addresses/addresses.module").then(module => module.AddressesModule),
            },
            {
                path: "orders",
                loadChildren: (): Promise<typeof OrdersModule> => import("./module/orders/orders.module").then(module => module.OrdersModule),
            },
            {
                path: "settings",
                loadChildren: (): Promise<typeof SettingsModule> => import("./module/settings/settings.module").then(module => module.SettingsModule),
            },
            {
                path: "sales",
                loadChildren: (): Promise<typeof SalesModule> => import("./module/sales/sales.module").then(module => module.SalesModule),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PersonRoutingModule {}
