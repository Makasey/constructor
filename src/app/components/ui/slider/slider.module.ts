import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { LZSliderComponent, LZSliderItemComponent } from "@components";

@NgModule({
    imports: [CommonModule],
    declarations: [LZSliderComponent, LZSliderItemComponent],
    exports: [LZSliderComponent],
})
export class LZSliderModule {}
