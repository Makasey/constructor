import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { LZSliderComponent } from "./slider.component";
import { LZSliderItemComponent } from "./components/slider-item.component";

@NgModule({
    imports: [CommonModule],
    declarations: [LZSliderComponent, LZSliderItemComponent],
    exports: [LZSliderComponent],
})
export class LZSliderModule {}
