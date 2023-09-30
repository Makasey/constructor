import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import {
    APDropdownFieldModule,
    APFormComponent,
    APNumberFieldModule,
    APTextFieldModule,
    CategoryControllerModule,
    CheckboxGroupModule,
    DirectionFieldComponent,
    ESFileUploadComponent,
    LZColorPickerComponent,
    NumberWithDropdownFieldComponent,
    RangeFieldComponent,
    RangeFieldWithUnitComponent,
    TextareaComponent,
} from "@components";

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
        RangeFieldComponent,
        RangeFieldWithUnitComponent,
        ReactiveFormsModule,
        TextareaComponent,
    ],
    exports: [APFormComponent],
})
export class APFormModule {}
