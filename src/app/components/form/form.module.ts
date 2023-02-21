import {APDropdownFieldModule, APNumberFieldModule, APTextFieldModule} from "../controls";
import {APFormComponent} from "./form.component";
import { CategoryControllerModule } from "../category-controller";
import { CheckboxGroupModule } from "../checkbox-group";
import { ColorPickerModule } from "../color-picker";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import { RangeControllerModule } from "../range-controller";
import {ReactiveFormsModule} from "@angular/forms";

const AP_MODULES = [APTextFieldModule, APNumberFieldModule, APDropdownFieldModule];

@NgModule({
    declarations: [APFormComponent],
    imports: [CommonModule, ReactiveFormsModule, ...AP_MODULES, CategoryControllerModule, RangeControllerModule, ColorPickerModule, CheckboxGroupModule],
    exports: [APFormComponent],
})
export class APFormModule {}
