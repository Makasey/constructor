import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NotifiationsComponent } from "./notifiations.component";
import { NotifiationsRoutingModule } from "./notifiations-routing.module";


@NgModule({
    declarations: [
        NotifiationsComponent,
    ],
    imports: [
        CommonModule,
        NotifiationsRoutingModule,
    ],
})
export class NotifiationsModule { }
