import { Route } from "@angular/router";

export const PREVIEW_ROUTES: Route[] = [
    {
        path: "",
        loadComponent: () => import("@modules/constructor").then(module => module.LZSitePreviewComponent),
    },
];
