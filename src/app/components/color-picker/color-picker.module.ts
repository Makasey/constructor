import { ColorPickerComponent } from "./color-picker.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [ColorPickerComponent],
  exports: [ColorPickerComponent],
  imports: [CommonModule],
})
export class ColorPickerModule {}
