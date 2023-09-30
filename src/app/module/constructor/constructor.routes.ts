import { LZConstructorComponent } from "@modules/constructor";
import { Route } from "@angular/router";

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
                path: ":id",
                loadChildren: () => import("@modules/constructor").then(routes => routes.PAGE_ROUTES),
            },
        ],
    },
];
