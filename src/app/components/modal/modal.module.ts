import { CommonModule } from "@angular/common";
import { HostModalContentDirective } from "./host-modal-content.directive";
import { ModalComponent } from "./modal.component";
import { ModalService } from "./modal.service";
import { NgModule } from "@angular/core";

@NgModule({
    declarations: [ModalComponent, HostModalContentDirective],
    providers: [ModalService],
    exports: [ModalComponent],
    imports: [CommonModule],
})
export class ModalModule {}
