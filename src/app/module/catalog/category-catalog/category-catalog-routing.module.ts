import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CategoryCatalogComponent } from "./category-catalog.component";

const ROUTES: Routes = [
    {
        path: "",
        component: CategoryCatalogComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class CategoryCatalogRoutingModule {}
