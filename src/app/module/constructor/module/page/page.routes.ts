import { Route } from "@angular/router";
import { RouteKey } from "@shared-types";

export const PAGE_ROUTES: Route[] = [
    {
        path: "",
        loadComponent: () => import("@modules/constructor").then(module => module.PageComponent),
        children: [
            {
                path: "",
                pathMatch: "full",
                redirectTo: RouteKey.CAMPAIGN_EDITOR,
            },
            {
                path: RouteKey.CAMPAIGN_EDITOR,
                loadComponent: () => import("@modules/constructor").then(module => module.PageInnerComponent),
            },
            {
                path: RouteKey.CAMPAIGN_PREVIEW,
                loadChildren: () => import("@modules/constructor").then(module => module.PREVIEW_ROUTES),
            },
        ],
    },
];
