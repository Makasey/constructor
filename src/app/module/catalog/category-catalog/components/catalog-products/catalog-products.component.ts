import { AbstractModuleComponent } from "../../../../../core/abstract/abstract.service";
import { AbstractProductService } from "../../../product/product.service";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
    selector: "lz-catalog-products",
    templateUrl: "./catalog-products.component.html",
    styleUrls: ["./catalog-products.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogProductsComponent extends AbstractModuleComponent {
    public products = toSignal(this.service.selectProduct());

    constructor(protected service: AbstractProductService) {
        super(service);
    }
}
