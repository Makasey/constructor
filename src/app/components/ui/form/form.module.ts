import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { CategoryControllerModule, CheckboxGroupModule, RangeControllerModule } from "@components/ui";

import { APDropdownFieldModule, APNumberFieldModule, APTextFieldModule } from "../controls";
import { APFormComponent } from "./form.component";
import { ESFileUploadComponent } from "@components/ui/controls/file-gallery/file-upload.component";
import { LZColorPickerComponent } from "@components/ui/controls/color-picker";
import { TextareaComponent } from "@components/ui/controls/textarea/textarea.component";

const AP_MODULES = [APTextFieldModule, APNumberFieldModule, APDropdownFieldModule];

@NgModule({
    declarations: [APFormComponent],
    imports: [
        ...AP_MODULES,
        CategoryControllerModule,
        CheckboxGroupModule,
        CommonModule,
        ESFileUploadComponent,
        LZColorPickerComponent,
        RangeControllerModule,
        ReactiveFormsModule,
        TextareaComponent,
    ],
    exports: [APFormComponent],
})
export class APFormModule {}
