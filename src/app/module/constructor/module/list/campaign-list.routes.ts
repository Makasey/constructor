import { Route } from "@angular/router";

export const CAMPAIGN_LIST_ROUTES: Route[] = [
    {
        path: "",
        loadComponent: () => import("@modules/constructor").then(module => module.CampaignListComponent),
    },
];
