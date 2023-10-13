import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { OverlayModule } from "@angular/cdk/overlay";
import { ReactiveFormsModule } from "@angular/forms";

import { APDropdownFieldActivePipe, APDropdownFieldComponent, APDropdownFieldItemComponent, APDropdownFieldLabelPipe } from "@components";

@NgModule({
    declarations: [APDropdownFieldActivePipe, APDropdownFieldComponent, APDropdownFieldItemComponent, APDropdownFieldLabelPipe],
    imports: [CommonModule, OverlayModule, ReactiveFormsModule],
    exports: [APDropdownFieldComponent],
})
export class APDropdownFieldModule {}
