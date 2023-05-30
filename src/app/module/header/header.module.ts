import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header.component";
import { MenuGroupComponent } from "@components/ui/menu-group/menu-group.component";
import { NavigationLinkPipe } from "@shared-pipes/navigation-link/navigation-link.pipe";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [HeaderComponent],
    exports: [HeaderComponent],
    imports: [CommonModule, MenuGroupComponent, NavigationLinkPipe, RouterModule],
})
export class HeaderModule {}
