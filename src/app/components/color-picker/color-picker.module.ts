import { ColorPickerComponent } from "./color-picker.component";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule({
    declarations: [ColorPickerComponent],
    exports: [ColorPickerComponent],
    imports: [CommonModule],
})
export class ColorPickerModule {}
