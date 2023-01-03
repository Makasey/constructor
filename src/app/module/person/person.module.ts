import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { PersonComponent } from "./person.component";
import { PersonRoutingModule } from "./person-routing.module";


@NgModule({
    declarations: [
        PersonComponent,
    ],
    imports: [
        CommonModule,
        PersonRoutingModule,
    ],
})
export class PersonModule { }
