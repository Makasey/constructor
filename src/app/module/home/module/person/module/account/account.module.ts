import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { AccountComponent } from "./account.component";
import { AccountRoutingModule } from "./account-routing.module";

@NgModule({
    declarations: [AccountComponent],
    imports: [AccountRoutingModule, CommonModule],
})
export class AccountModule {}
