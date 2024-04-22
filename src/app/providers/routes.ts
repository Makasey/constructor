import { Route } from "@angular/router";
import { RouteKey } from "@shared-types";

export const APP_ROUTES = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: RouteKey.BUILDER,
    },
    {
        path: RouteKey.BUILDER,
        loadChildren: (): Promise<Route[]> => import("@modules/constructor").then(module => module.CONSTRUCTOR_ROUTES),
    },
]