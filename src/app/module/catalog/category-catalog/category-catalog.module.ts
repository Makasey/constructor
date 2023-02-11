import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import {APFormModule} from "../../../components/form";
import { CatalogFiltersComponent } from "./components/catalog-filters/catalog-filters.component";
import { CatalogProductsComponent } from "./components/catalog-products/catalog-products.component";
import { CategoryCatalogComponent } from "./category-catalog.component";
import { CategoryCatalogRoutingModule } from "./category-catalog-routing.module";
import {
    CategoryControllerModule,
    CheckboxGroupModule,
    ColorPickerModule,
    ProductCardModule,
    RangeControllerModule,
} from "../../../components";

@NgModule({
    declarations: [CategoryCatalogComponent, CatalogFiltersComponent, CatalogProductsComponent],
    imports: [CommonModule, CategoryCatalogRoutingModule, CheckboxGroupModule, ProductCardModule, RangeControllerModule, CategoryControllerModule, ColorPickerModule, APFormModule],
})
export class CategoryCatalogModule {}
