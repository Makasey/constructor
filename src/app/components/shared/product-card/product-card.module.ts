import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ProductCardComponent } from "@components/shared";

@NgModule({
    declarations: [ProductCardComponent],
    exports: [ProductCardComponent],
    imports: [CommonModule],
})
export class ProductCardModule {}
