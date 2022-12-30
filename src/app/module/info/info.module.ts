import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { InfoComponent } from "./info.component";
import { InfoRoutingModule } from "./info-routing.module";


@NgModule({
    declarations: [
        InfoComponent,
    ],
    imports: [
        CommonModule,
        InfoRoutingModule,
    ],
})
export class InfoModule { }
