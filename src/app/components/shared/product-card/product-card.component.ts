import { ChangeDetectionStrategy, Component, Input, signal } from "@angular/core";
import { Product } from "../../../types";

@Component({
    selector: "lz-product-cart",
    templateUrl: "./product-card.component.html",
    styleUrls: ["./product-card.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
    @Input() public set product(value: Product) {
        this._product.set(value);
    }

    public _product = signal<Product>({} as Product);
}
