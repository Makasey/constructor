import { Routes } from "@angular/router";

import { RouteKey } from "@shared-enums";

export const APP_ROUTES: Routes = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: RouteKey.BUILDER,
    },
    {
        path: RouteKey.BUILDER,
        loadChildren: () => import("@modules/constructor").then(module => module.CONSTRUCTOR_ROUTES),
    },
];
