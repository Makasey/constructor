import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { APDropdownFieldModule, APNumberFieldModule, APTextFieldModule } from "../controls";
import { APFormComponent } from "./form.component";
import { CategoryControllerModule } from "../category-controller";
import { CheckboxGroupModule } from "../checkbox-group";
import { ColorPickerModule } from "../color-picker";
import { RangeControllerModule } from "../range-controller";

const AP_MODULES = [APTextFieldModule, APNumberFieldModule, APDropdownFieldModule];

@NgModule({
    declarations: [APFormComponent],
    imports: [
        ...AP_MODULES,
        CommonModule,
        ReactiveFormsModule,
        CategoryControllerModule,
        RangeControllerModule,
        ColorPickerModule,
        CheckboxGroupModule,
    ],
    exports: [APFormComponent],
})
export class APFormModule {}
