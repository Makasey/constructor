import { PageComponent, PageInnerComponent } from "@modules/constructor";
import { Route } from "@angular/router";

export const PAGE_ROUTES: Route[] = [
    {
        path: "",
        component: PageComponent,
        children: [
            {
                path: "",
                pathMatch: "full",
                redirectTo: "editor",
            },
            {
                path: "editor",
                component: PageInnerComponent,
            },
            {
                path: "preview",
                loadChildren: () => import("@modules/constructor").then(module => module.PREVIEW_ROUTES),
            },
        ],
    },
];
