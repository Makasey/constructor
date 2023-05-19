import { AbstractCatalogProductsService } from "./catalog-products.service";
import { AbstractModuleComponent } from "src/app/core/abstract/abstract.service";
import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "lz-catalog-products",
    templateUrl: "./catalog-products.component.html",
    styleUrls: ["./catalog-products.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogProductsComponent extends AbstractModuleComponent {

    public products$ = this.service.getProducts();
    constructor(protected service: AbstractCatalogProductsService) {
        super(service);
    }
}
