import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { HostModalContentDirective, ModalComponent, ModalService } from "@components";

@NgModule({
    declarations: [HostModalContentDirective, ModalComponent],
    providers: [ModalService],
    exports: [ModalComponent],
    imports: [CommonModule],
})
export class ModalModule {}
