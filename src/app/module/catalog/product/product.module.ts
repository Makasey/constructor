import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { AbstractProductService, DefaultProductService } from "./product.service";
import { ProductComponent } from "./product.component";
import { ProductRoutingModule } from "./product-routing.module";

@NgModule({
    declarations: [ProductComponent],
    imports: [CommonModule, ProductRoutingModule],
    providers: [
        {
            provide: AbstractProductService,
            useClass: DefaultProductService,
        },
    ],
})
export class ProductModule {}
