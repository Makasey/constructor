import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { SalesComponent } from "./sales.component";
import { SalesRoutingModule } from "./sales-routing.module";


@NgModule({
    declarations: [
        SalesComponent,
    ],
    imports: [
        CommonModule,
        SalesRoutingModule,
    ],
})
export class SalesModule { }
