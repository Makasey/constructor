import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { BuyoutComponent } from "./buyout.component";
import { BuyoutRoutingModule } from "./buyout-routing.module";

@NgModule({
    declarations: [BuyoutComponent],
    imports: [CommonModule, BuyoutRoutingModule],
})
export class BuyoutModule {}
