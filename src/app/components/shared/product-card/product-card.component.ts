import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Product } from "../../../types";

@Component({
    selector: "lz-product-cart",
    templateUrl: "./product-card.component.html",
    styleUrls: ["./product-card.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
    @Input() public product: Product;
}
