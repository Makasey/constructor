import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { APNumberFieldComponent } from "./number-field.component";

@NgModule({
    declarations: [APNumberFieldComponent],
    imports: [CommonModule, ReactiveFormsModule],
    exports: [APNumberFieldComponent],
})
export class APNumberFieldModule {}
