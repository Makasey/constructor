import { PageComponent } from "@modules/constructor/module/page/page.component";
import { PageInnerComponent } from "@modules/constructor/module/page-inner/page-inner.component";
import { Route } from "@angular/router";

export const PAGE_ROUTES: Route[] = [
    {
        path: "",
        component: PageComponent,
        children: [
            {
                path: "",
                pathMatch: "full",
                redirectTo: "create",
            },
            {
                path: "create",
                component: PageInnerComponent,
            },
        ],
    },
];
