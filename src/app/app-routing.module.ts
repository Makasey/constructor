import { HomeModule } from "@modules/home/home.module";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TestModule } from "@modules/test/test.module";

const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: "home",
    },
    {
        path: "home",
        loadChildren: (): Promise<typeof HomeModule> => import("@modules/home/home.module").then(module => module.HomeModule),
    },
    {
        path: "constructor",
        loadChildren: (): Promise<typeof TestModule> => import("@modules/test/test.module").then(module => module.TestModule),
    },
    {
        path: "lessons",
        loadChildren: (): Promise<typeof TestModule> => import("@modules/test/test.module").then(module => module.TestModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
