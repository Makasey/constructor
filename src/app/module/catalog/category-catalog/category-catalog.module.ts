import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { CategoryCatalogComponent } from "./category-catalog.component";
import { CategoryCatalogRoutingModule } from "./category-catalog-routing.module";
import { CatalogFiltersComponent } from "./components/catalog-filters/catalog-filters.component";
import { CheckboxGroupModule } from "../../../components/checkbox-group/checkbox-group.module";
import { CatalogProductsComponent } from "./components/catalog-products/catalog-products.component";
import { ProductCartModule } from '../../../components/product-cart/product-cart.module';

@NgModule({
    declarations: [CategoryCatalogComponent, CatalogFiltersComponent, CatalogProductsComponent],
    imports: [CommonModule, CategoryCatalogRoutingModule, CheckboxGroupModule, ProductCartModule],
})
export class CategoryCatalogModule {}
