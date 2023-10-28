import { LZConstructorComponent } from "@modules/constructor";
import { Route } from "@angular/router";
import { RouteParams } from "@shared-types";

export const CONSTRUCTOR_ROUTES: Route[] = [
    {
        path: "",
        component: LZConstructorComponent,
        children: [
            {
                path: "",
                redirectTo: "list",
                pathMatch: "full",
            },
            {
                path: "list",
                loadChildren: () => import("@modules/constructor").then(routes => routes.CAMPAIGN_LIST_ROUTES),
            },
            {
                path: `:${RouteParams.CAMPAIGN_ID}`,
                loadChildren: () => import("@modules/constructor").then(routes => routes.PAGE_ROUTES),
            },
        ],
    },
];
