import { Routes } from "@angular/router";
import { RouteKey } from "@shared-types";

export const APP_ROUTES: Routes = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: RouteKey.BUILDER,
    },
    {
        path: RouteKey.BUILDER,
        loadComponent: () => import("@modules/constructor").then(module => module.CONSTRUCTOR_ROUTES),
    },
]