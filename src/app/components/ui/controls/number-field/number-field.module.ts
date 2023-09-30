import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";

import { APNumberFieldComponent } from "@components";

@NgModule({
    declarations: [APNumberFieldComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    exports: [APNumberFieldComponent],
})
export class APNumberFieldModule {}
