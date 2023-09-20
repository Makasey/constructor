import { NgModule } from "@angular/core";
import { Route, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: "builder",
    },
    {
        path: "builder",
        loadChildren: (): Promise<Route[]> => import("@modules/constructor").then(module => module.CONSTRUCTOR_ROUTES),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
