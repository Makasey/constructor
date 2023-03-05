import { BelongArrayPipe } from "src/app/pipes/belong-array.pipe";
import { ColorPickerComponent } from "./color-picker.component";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule({
    declarations: [ColorPickerComponent, BelongArrayPipe],
    exports: [ColorPickerComponent],
    imports: [CommonModule],
})
export class ColorPickerModule {}
