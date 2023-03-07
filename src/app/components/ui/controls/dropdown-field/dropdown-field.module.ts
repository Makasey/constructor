import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { OverlayModule } from "@angular/cdk/overlay";
import { ReactiveFormsModule } from "@angular/forms";

import { APDropdownFieldActivePipe } from "./dropdown-field-active.pipe";
import { APDropdownFieldComponent } from "./dropdown-field.component";
import { APDropdownFieldItemComponent } from "./components/dropdown-field-item/dropdown-field-item.component";
import { APDropdownFieldLabelPipe } from "./dropdown-field-label.pipe";

@NgModule({
    declarations: [APDropdownFieldComponent, APDropdownFieldActivePipe, APDropdownFieldItemComponent, APDropdownFieldLabelPipe],
    imports: [CommonModule, ReactiveFormsModule, OverlayModule],
    exports: [APDropdownFieldComponent],
})
export class APDropdownFieldModule {}
