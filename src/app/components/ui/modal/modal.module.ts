import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { HostModalContentDirective, ModalComponent, ModalService } from "@components";

@NgModule({
    providers: [ModalService],
    exports: [ModalComponent],
    imports: [CommonModule, HostModalContentDirective, ModalComponent],
})
export class ModalModule {}
