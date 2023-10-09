import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import {
    APDropdownFieldModule,
    APFormComponent,
    APNumberFieldModule,
    APTextFieldModule,
    DirectionFieldComponent,
    LZColorPickerComponent,
    LZFileUploadComponent,
    NumberWithDropdownFieldComponent,
    RadioGroupComponent,
    RangeFieldComponent,
    RangeFieldWithUnitComponent,
    TextareaComponent,
} from "@components";
import { LZImageFieldComponent } from "@components/ui/controls/image-field/image-field.component";

const AP_MODULES = [APTextFieldModule, APNumberFieldModule, APDropdownFieldModule];

@NgModule({
    declarations: [APFormComponent],
    imports: [
        ...AP_MODULES,
        CommonModule,
        DirectionFieldComponent,
        LZColorPickerComponent,
        LZFileUploadComponent,
        LZImageFieldComponent,
        NumberWithDropdownFieldComponent,
        RadioGroupComponent,
        RangeFieldComponent,
        RangeFieldWithUnitComponent,
        ReactiveFormsModule,
        TextareaComponent,
    ],
    exports: [APFormComponent],
})
export class APFormModule {}
