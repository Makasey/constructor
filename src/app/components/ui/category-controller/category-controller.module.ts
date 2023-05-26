import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { CategoryControllerComponent } from "./category-controller.component";

@NgModule({
    declarations: [CategoryControllerComponent],
    imports: [CommonModule],
    exports: [CategoryControllerComponent],
})
export class CategoryControllerModule {}
