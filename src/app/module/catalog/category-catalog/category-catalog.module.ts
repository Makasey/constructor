import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { CategoryCatalogComponent } from "./category-catalog.component";
import { CategoryCatalogRoutingModule } from "./category-catalog-routing.module";


@NgModule({
    declarations: [
        CategoryCatalogComponent,
    ],
    imports: [
        CommonModule,
        CategoryCatalogRoutingModule,
    ],
})
export class CategoryCatalogModule { }
