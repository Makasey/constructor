import { BurgerComponent } from "@components/shared/burger/burger.component";
import { ChangeDetectionStrategy, Component, ViewContainerRef, inject } from "@angular/core";
import { ModalService, ModalType, ModalWithData } from "@components/ui";
import { ProductCartComponent } from "@components/shared/product-cart/product-cart.component";
import { RouteKey } from "@shared-types/routes/route-paths";

type ModalData = ModalWithData<{ id: string; }>;

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
    public readonly accountLink = RouteKey.ACCOUNT;

    public readonly homeLink = RouteKey.HOME;

    public readonly catalogLink = RouteKey.CATALOG;

    public modalId: string | null = null;

    public productCartId: string = crypto.randomUUID();

    private readonly modalService = inject(ModalService);

    private readonly viewContainerRef = inject(ViewContainerRef);

    public openModal(): void {
        this.modalId = crypto.randomUUID();

        this.modalService.openModal<ModalData>({
            id: this.modalId,
            closable: true,
            title: "",
            closeOnOutsideClick: true,
            overlayVisible: true,
            customClass: "lz-burger-modal",
            viewContainerRef: this.viewContainerRef,
            component: BurgerComponent,
            contentType: ModalType.COMPONENT,
            data: {
                id: this.modalId,
            },
        });
    }

    public openProductCartModal(): void {
        this.modalService.openModal({
            component: ProductCartComponent,
            contentType: ModalType.COMPONENT,
            id: this.productCartId,
            title: "",
            viewContainerRef: this.viewContainerRef,
            closable: true,
            closeOnOutsideClick: true,
            customClass: "product-cart-modal",
        });
    }
}
