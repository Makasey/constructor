import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NavigationLinkPipe } from "@shared-pipes/navigation-link/navigation-link.pipe";
import { PersonComponent } from "./person.component";
import { PersonRoutingModule } from "./person-routing.module";

@NgModule({
    declarations: [PersonComponent],
    imports: [CommonModule, NavigationLinkPipe, PersonRoutingModule],
})
export class PersonModule {}
