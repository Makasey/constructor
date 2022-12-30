import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home.component";
import { HomeRoutingModule } from "./home-routing.module";
import { NgModule } from "@angular/core";

@NgModule({
    declarations: [HomeComponent],
    imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
