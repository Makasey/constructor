import { CommonModule } from "@angular/common";
import { FooterModule } from "@modules/home/module/footer/footer.module";
import { HeaderModule } from "@modules/home/module/header/header.module";
import { HomeComponent } from "./home.component";
import { HomeInnerComponent } from "@modules/home/home-inner.component";
import { HomeRoutingModule } from "./home-routing.module";
import { LZToastrModule } from "@components/ui";
import { NgModule } from "@angular/core";

@NgModule({
    declarations: [HomeComponent, HomeInnerComponent],
    imports: [CommonModule, FooterModule, HeaderModule, HomeRoutingModule, LZToastrModule],
})
export class HomeModule {}
