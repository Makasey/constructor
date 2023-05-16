import { AbstractModuleComponent } from "../../../../../core/abstract/abstract.service";
import { AbstractProductService } from "../../../product/product.service";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../../../../../types";

@Component({
    selector: "lz-catalog-products",
    templateUrl: "./catalog-products.component.html",
    styleUrls: ["./catalog-products.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogProductsComponent extends AbstractModuleComponent {
    public products$: Observable<Product[]> = this.service.selectProduct();

    constructor(protected service: AbstractProductService) {
        super(service);
    }
}
