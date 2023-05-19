import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { BelongArrayPipeModule } from "app/pipes";

import { ColorPickerComponent } from "./color-picker.component";

@NgModule({
    declarations: [ColorPickerComponent],
    exports: [ColorPickerComponent],
    imports: [CommonModule, BelongArrayPipeModule],
})
export class ColorPickerModule {}
