import { AbstractCatalogProductsService, DefaultCatalogProductsService } from "./catalog-products.service";
import { CatalogProductsComponent } from "./catalog-products.component";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PreloadDirectiveModule } from "@shared-directives/preload/preload.module";
import { ProductCardModule } from "@components/shared";
@NgModule({
    declarations: [CatalogProductsComponent],
    exports: [CatalogProductsComponent],
    imports: [CommonModule, PreloadDirectiveModule, ProductCardModule],
    providers: [
        {
            provide: AbstractCatalogProductsService,
            useClass: DefaultCatalogProductsService,
        },
    ],
})
export class CatalogProductsModule {}
