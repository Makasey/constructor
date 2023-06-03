import { AbstractProductCartService } from "@components/shared/product-cart/product-cart.service";
import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ModalWithData } from "@components/ui";

@Component({
    selector: "lz-product-cart",
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ["product-cart.component.scss"],
    templateUrl: "./product-cart.component.html",
    imports: [CommonModule],
})
export class ProductCartComponent implements ModalWithData<undefined> {
    @HostBinding("class.lz-product-cart")
    public hostClass = true;

    public data: undefined;

    private readonly productCartService = inject(AbstractProductCartService);

    public cartItems$ = this.productCartService.selectProductItems();
}
