import { ChangeDetectionStrategy, Component } from "@angular/core";

import { toSignal } from "@angular/core/rxjs-interop";

import { AbstractCatalogProductsService } from "@modules/catalog/category-catalog/components/catalog-products/catalog-products.service";
import { AbstractModuleComponent } from "@core/abstract/abstract.service";
import { Product } from "@shared-types/product/product";
import { untilDestroyed } from "@ngneat/until-destroy";

@Component({
    selector: "lz-catalog-products",
    templateUrl: "./catalog-products.component.html",
    styleUrls: ["./catalog-products.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogProductsComponent extends AbstractModuleComponent {
    public products = toSignal<Product[]>(this.service.getProducts());

    public canLoad = toSignal<boolean>(this.service.canLoadProducts());

    constructor(protected service: AbstractCatalogProductsService) {
        super(service);
    }

    public loadMore(): void {
        this.service.loadMoreProducts().pipe(untilDestroyed(this)).subscribe();
    }
}
