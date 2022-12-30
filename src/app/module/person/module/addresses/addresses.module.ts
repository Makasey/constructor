import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { AddressesComponent } from "./addresses.component";
import { AddressesRoutingModule } from "./addresses-routing.module";


@NgModule({
    declarations: [
        AddressesComponent,
    ],
    imports: [
        CommonModule,
        AddressesRoutingModule,
    ],
})
export class AddressesModule { }
