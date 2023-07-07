import { AbstractProductCartService } from "@components/shared/product-cart/product-cart.service";
import { CartItem } from "@shared-types/cart/cart";
import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { LZInitVarDirective } from "@shared-directives/init-var/init-var.directive";
import { ModalWithData } from "@components/ui";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
    selector: "lz-product-cart",
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ["product-cart.component.scss"],
    templateUrl: "./product-cart.component.html",
    imports: [CommonModule, FormsModule, LZInitVarDirective],
})
export class ProductCartComponent implements ModalWithData<undefined> {
    @HostBinding("class.lz-product-cart")
    public hostClass = true;

    public data: undefined;

    private readonly productCartService = inject(AbstractProductCartService);

    public cartItems$ = this.productCartService.selectProductItems();

    public cart$ = this.productCartService.selectCart();

    public deleteItemFromCart(cartItem: CartItem): void {
        const { cartId, id } = cartItem;

        this.productCartService.deleteCartItem(id, cartId).pipe(untilDestroyed(this)).subscribe();
    }

    public incrementProductCartCount(cartItem: CartItem): void {
        const { product } = cartItem;

        this.productCartService.updateCartItemCount(product.id, 1).pipe(untilDestroyed(this)).subscribe();
    }

    public decrementProductCartCount(cartItem: CartItem): void {
        const { product } = cartItem;

        this.productCartService.updateCartItemCount(product.id, -1).pipe(untilDestroyed(this)).subscribe();
    }
}
