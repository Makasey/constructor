import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CatalogComponent } from "./catalog.component";
import { ProductModule } from "./product/product.module";
import { CategoryCatalogModule } from "./category-catalog/category-catalog.module";

const ROUTES: Routes = [
    {
        path: ":catalogName",
        component: CatalogComponent,
        children: [
            {
                path: "",
                loadChildren: (): Promise<typeof CategoryCatalogModule> => import("./category-catalog/category-catalog.module").then(module => module.CategoryCatalogModule),
            },
            {
                path: ":productId",
                loadChildren: (): Promise<typeof ProductModule> => import("./product/product.module").then(module => module.ProductModule),
            },
        ],
    },
    {
        path: "**",
        redirectTo: "/",
    },
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class CatalogRoutingModule {}
