import { AbstractProductCartService } from "@components/shared/product-cart/product-cart.service";
import { ChangeDetectionStrategy, Component, Input, inject, signal } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../../../types";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
    selector: "lz-product-card",
    templateUrl: "./product-card.component.html",
    styleUrls: ["./product-card.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
    @Input({ required: true }) public set product(value: Product) {
        this._product.set(value);
    }

    public _product = signal<Product>({} as Product);

    private readonly cartService = inject(AbstractProductCartService);

    public addProductToCart(product: Product): void {
        const isProductInCart = this.cartService.isProductInCart(product.id);

        let request: Observable<unknown>;

        if (isProductInCart) {
            request = this.cartService.updateCartItemCount(product.id, 1);
        } else {
            request = this.cartService.addItemToCart(product);
        }

        request.pipe(untilDestroyed(this)).subscribe();
    }
}
