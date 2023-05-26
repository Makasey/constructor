import { ChangeDetectionStrategy, Component } from "@angular/core";

import { toSignal } from "@angular/core/rxjs-interop";

import {
    AbstractCatalogProductsService,
} from "@modules/catalog/category-catalog/components/catalog-products/catalog-products.service";
import { AbstractModuleComponent } from "@core/abstract/abstract.service";

@Component({
    selector: "lz-catalog-products",
    templateUrl: "./catalog-products.component.html",
    styleUrls: ["./catalog-products.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogProductsComponent extends AbstractModuleComponent {
    public products = toSignal(this.service.getProducts());

    constructor(protected service: AbstractCatalogProductsService) {
        super(service);
    }
}
