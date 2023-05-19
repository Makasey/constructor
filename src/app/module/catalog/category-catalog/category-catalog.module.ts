import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { APFormModule } from "src/app/components";
import { CatalogProductsModule } from "./components/catalog-products/catalog-products.module";
import { CategoryCatalogComponent } from "./category-catalog.component";
import { CategoryCatalogRoutingModule } from "./category-catalog-routing.module";
import { CategoryControllerModule, CheckboxGroupModule, ColorPickerModule, RangeControllerModule } from "../../../components";
import { LZCatalogFiltersModule } from "./components/catalog-filters/catalog-filters.module";

@NgModule({
    declarations: [CategoryCatalogComponent],
    imports: [
        APFormModule,
        CatalogProductsModule,
        CategoryCatalogRoutingModule,
        CategoryControllerModule,
        CheckboxGroupModule,
        ColorPickerModule,
        CommonModule,
        LZCatalogFiltersModule,
        RangeControllerModule,
    ],
})
export class CategoryCatalogModule {}
