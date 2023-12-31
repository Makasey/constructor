import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import {
    APDropdownFieldModule,
    APFormComponent,
    APNumberFieldModule,
    APTextFieldModule,
    BackgroundFieldComponent,
    BorderFieldComponent,
    DirectionFieldComponent,
    ItemsControlFieldComponent,
    LZColorPickerComponent,
    LZFileUploadComponent,
    LZImageFieldComponent,
    NumberWithDropdownFieldComponent,
    RadioGroupComponent,
    RangeFieldComponent,
    RangeFieldWithUnitComponent,
    TextareaComponent,
} from "@components";

const AP_MODULES = [APTextFieldModule, APNumberFieldModule, APDropdownFieldModule];

@NgModule({
    declarations: [APFormComponent],
    imports: [
        ...AP_MODULES,
        BackgroundFieldComponent,
        BorderFieldComponent,
        CommonModule,
        DirectionFieldComponent,
        ItemsControlFieldComponent,
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
