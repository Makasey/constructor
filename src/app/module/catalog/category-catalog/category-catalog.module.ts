import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { APFormModule } from "src/app/components";
import { AbstractProductService, DefaultProductService } from "../product/product.service";
import { CatalogProductsComponent } from "./components/catalog-products/catalog-products.component";
import { CategoryCatalogComponent } from "./category-catalog.component";
import { CategoryCatalogRoutingModule } from "./category-catalog-routing.module";
import { CategoryControllerModule, CheckboxGroupModule, ColorPickerModule, ProductCardModule, RangeControllerModule } from "../../../components";
import { LZCatalogFiltersModule } from "./components/catalog-filters/catalog-filters.module";

@NgModule({
    declarations: [CatalogProductsComponent, CategoryCatalogComponent],
    imports: [
        APFormModule,
        CategoryCatalogRoutingModule,
        CategoryControllerModule,
        CheckboxGroupModule,
        ColorPickerModule,
        CommonModule,
        LZCatalogFiltersModule,
        ProductCardModule,
        RangeControllerModule,
    ],
    providers: [
        {
            provide: AbstractProductService,
            useClass: DefaultProductService,
        },
    ],
})
export class CategoryCatalogModule {}
