import { BurgerComponent } from "@components/shared/burger/burger.component";
import { ChangeDetectionStrategy, Component, ViewContainerRef, inject } from "@angular/core";
import { ModalService, ModalType, ModalWithData } from "@components/ui";
import { RouteKey } from "@shared-types/routes/route-paths";

type ModalData = ModalWithData<{ id: string; }>;

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
    public accountLink = RouteKey.ACCOUNT;

    public modalId: string | null = null;

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

    public closeModal(): void {
        if (!this.modalId) {
            return;
        }

        this.modalService.closeModal(this.modalId);

        this.modalId = null;
    }
}
