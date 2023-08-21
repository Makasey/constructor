import { LZConstructorComponent } from "@modules/constructor";
import { Route } from "@angular/router";

export const CONSTRUCTOR_ROUTES: Route[] = [
    {
        path: "",
        component: LZConstructorComponent,
        children: [
            {
                path: ":id",
                loadChildren: () => import("./module/page/page.routes").then(routes => routes.PAGE_ROUTES),
            },
        ],
    },
];
