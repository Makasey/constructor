import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { CategoryControllerModule, CheckboxGroupModule, NumberWithDropdownFieldComponent, RangeControllerModule } from "@components/ui";

import { APDropdownFieldModule, APNumberFieldModule, APTextFieldModule } from "../controls";
import { APFormComponent } from "@components/ui";
import { DirectionFieldComponent } from "@components/ui/controls/direction-field";
import { ESFileUploadComponent } from "@components/ui/controls/file-gallery/file-upload.component";
import { LZColorPickerComponent } from "@components/ui/controls/color-picker";
import { RangeFieldWithUnitComponent } from "@components/ui/controls/range-field";
import { TextareaComponent } from "@components/ui/controls/textarea/textarea.component";

const AP_MODULES = [APTextFieldModule, APNumberFieldModule, APDropdownFieldModule];

@NgModule({
    declarations: [APFormComponent],
    imports: [
        ...AP_MODULES,
        CategoryControllerModule,
        CheckboxGroupModule,
        CommonModule,
        DirectionFieldComponent,
        ESFileUploadComponent,
        LZColorPickerComponent,
        NumberWithDropdownFieldComponent,
        RangeControllerModule,
        RangeFieldWithUnitComponent,
        ReactiveFormsModule,
        TextareaComponent,
    ],
    exports: [APFormComponent],
})
export class APFormModule {}
