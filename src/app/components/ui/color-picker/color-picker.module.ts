import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { BelongArrayPipe } from "app/pipes";

import { ColorPickerComponent } from "./color-picker.component";

@NgModule({
    declarations: [ColorPickerComponent],
    exports: [ColorPickerComponent],
    imports: [BelongArrayPipe, CommonModule],
})
export class ColorPickerModule {}
