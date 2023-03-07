import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { HostModalContentDirective } from "./host-modal-content.directive";
import { ModalComponent } from "./modal.component";
import { ModalService } from "./modal.service";

@NgModule({
    declarations: [ModalComponent, HostModalContentDirective],
    providers: [ModalService],
    exports: [ModalComponent],
    imports: [CommonModule],
})
export class ModalModule {}
