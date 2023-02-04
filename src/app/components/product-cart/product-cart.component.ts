import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "lz-product-cart",
    templateUrl: "./product-cart.component.html",
    styleUrls: ["./product-cart.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCartComponent {}
