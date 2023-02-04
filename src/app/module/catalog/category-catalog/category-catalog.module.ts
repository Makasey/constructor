import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { CatalogFiltersComponent } from "./components/catalog-filters/catalog-filters.component";
import { CatalogProductsComponent } from "./components/catalog-products/catalog-products.component";
import { CategoryCatalogComponent } from "./category-catalog.component";
import { CategoryCatalogRoutingModule } from "./category-catalog-routing.module";
import { CategoryControllerModule } from "../../../components/category-controller/category-controller.module";
import { CheckboxGroupModule } from "../../../components/checkbox-group/checkbox-group.module";
import { ProductCartModule } from "../../../components/product-cart/product-cart.module";
import { RangeControllerModule } from "../../../components/range-controller/range-controller.module";

@NgModule({
    declarations: [CategoryCatalogComponent, CatalogFiltersComponent, CatalogProductsComponent],
    imports: [
        CommonModule,
        CategoryCatalogRoutingModule,
        CheckboxGroupModule,
        ProductCartModule,
        RangeControllerModule,
        CategoryControllerModule,
    ],
})
export class CategoryCatalogModule {}
