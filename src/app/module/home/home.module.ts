import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home.component";
import { HomeRoutingModule } from "./home-routing.module";
import { NgModule } from "@angular/core";
import {FooterModule} from "../footer/footer.module";
import {HeaderModule} from "../header/header.module";

@NgModule({
    declarations: [HomeComponent],
    imports: [CommonModule, HomeRoutingModule, FooterModule, HeaderModule],
})
export class HomeModule {}
