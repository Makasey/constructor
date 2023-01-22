import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ProductCartComponent } from "./product-cart.component";


@NgModule({
    declarations: [
        ProductCartComponent,
    ],
    exports: [
        ProductCartComponent,
    ],
    imports: [
        CommonModule,
    ],
})
export class ProductCartModule { }
