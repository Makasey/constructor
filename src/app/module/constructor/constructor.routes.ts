import { Route } from "@angular/router";
import { RouteKey, RouteParams } from "@shared-types";

export const CONSTRUCTOR_ROUTES: Route[] = [
    {
        path: "",
        loadComponent: () => import("@modules/constructor").then(module => module.LZConstructorComponent),
        children: [
            {
                path: "",
                redirectTo: RouteKey.CAMPAIGN_LIST,
                pathMatch: "full",
            },
            {
                path: RouteKey.CAMPAIGN_LIST,
                loadChildren: () => import("@modules/constructor").then(routes => routes.CAMPAIGN_LIST_ROUTES),
            },
            {
                path: `:${RouteParams.CAMPAIGN_ID}`,
                loadChildren: () => import("@modules/constructor").then(routes => routes.PAGE_ROUTES),
            },
        ],
    },
];
