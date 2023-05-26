import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { CategoryControllerModule, CheckboxGroupModule, ColorPickerModule, RangeControllerModule } from "@components/ui";

import { APDropdownFieldModule, APNumberFieldModule, APTextFieldModule } from "../controls";
import {APFormComponent} from "./form.component";

const AP_MODULES = [APTextFieldModule, APNumberFieldModule, APDropdownFieldModule];

@NgModule({
    declarations: [APFormComponent],
    imports: [
        ...AP_MODULES,
        CategoryControllerModule,
        CheckboxGroupModule,
        ColorPickerModule,
        CommonModule,
        RangeControllerModule,
        ReactiveFormsModule,
    ],
    exports: [APFormComponent],
})
export class APFormModule {}
