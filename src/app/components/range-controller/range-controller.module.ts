import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RangeControllerComponent } from "./range-controller.component";
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [RangeControllerComponent],
    exports: [RangeControllerComponent],
  imports: [CommonModule, FormsModule],
})
export class RangeControllerModule {}
