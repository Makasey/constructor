
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AccountModule } from "./module/account/account.module";
import { AddressesModule } from "./module/addresses/addresses.module";
import { NotifiationsModule } from "./module/notifiations/notifiations.module";
import { OrdersModule } from "./module/orders/orders.module";
import { PersonComponent } from "./person.component";
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
                redirectTo: "account",
            },
            {
                path: "account",
                loadChildren: (): Promise<typeof AccountModule> => import("./module/account/account.module").then(module => module.AccountModule),
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
                path: "notifiations",
                loadChildren: (): Promise<typeof NotifiationsModule> => import("./module/notifiations/notifiations.module").then(module => module.NotifiationsModule),
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
