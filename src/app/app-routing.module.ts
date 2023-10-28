import { NgModule } from "@angular/core";
import { Route, RouterModule, Routes } from "@angular/router";
import { RouteKey } from "@shared-types";

const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: RouteKey.BUILDER,
    },
    {
        path: RouteKey.BUILDER,
        loadChildren: (): Promise<Route[]> => import("@modules/constructor").then(module => module.CONSTRUCTOR_ROUTES),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { paramsInheritanceStrategy: "always" })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
