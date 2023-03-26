import { CatalogProductsComponent } from "./catalog-products.component";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PreloadDirectiveModule } from "../../../../../directive/preload/preload.module";
import { ProductCardModule } from "../../../../../components";

@NgModule({
    declarations: [CatalogProductsComponent],
    exports: [CatalogProductsComponent],
    imports: [CommonModule, PreloadDirectiveModule, ProductCardModule],
})
export class CatalogProductsModule {}
