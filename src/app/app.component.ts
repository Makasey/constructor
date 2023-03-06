import { ChangeDetectionStrategy, Component, ViewContainerRef } from "@angular/core";
import { LZLoginComponent } from "./components/shared/login/login.component";
import { ModalService, ModalType } from "./components/ui/modal";
import { LZMonth } from "./pipes/month-sheet/classes/month";

@Component({
    selector: "app-root",
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent {
    public title = "lavka-roz-frontend";

    public month = new LZMonth(2023, 2);

    public preloadLoading = true;

    public id: string = "my-login-modal";

    constructor(private modalService: ModalService, private viewContainerRef: ViewContainerRef) {}

    public changePreloadVisibility(): void {
        this.preloadLoading = !this.preloadLoading;
    }

    public openLoginModal(): void {
        this.modalService.openModal<LZLoginComponent>({
            id: this.id,
            viewContainerRef: this.viewContainerRef,
            contentType: ModalType.COMPONENT,
            component: LZLoginComponent,
            data: {
                type: "login",
            },
            title: "Войти",
            customClass: "login-modal",
            closeOnOutsideClick: true,
        });
    }
}
