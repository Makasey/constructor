import { PageComponent, PageInnerComponent } from "@modules/constructor";
import { Route } from "@angular/router";
import { RouteKey } from "@shared-types";

export const PAGE_ROUTES: Route[] = [
    {
        path: "",
        component: PageComponent,
        children: [
            {
                path: "",
                pathMatch: "full",
                redirectTo: RouteKey.CAMPAIGN_EDITOR,
            },
            {
                path: RouteKey.CAMPAIGN_EDITOR,
                component: PageInnerComponent,
            },
            {
                path: RouteKey.CAMPAIGN_PREVIEW,
                loadChildren: () => import("@modules/constructor").then(module => module.PREVIEW_ROUTES),
            },
        ],
    },
];
