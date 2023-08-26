import { CampaignListComponent } from "@modules/constructor/module/list/campaign-list.component";
import { Route } from "@angular/router";

export const CAMPAIGN_LIST_ROUTES: Route[] = [
    {
        path: "",
        component: CampaignListComponent,
    },
];
