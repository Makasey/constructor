import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { TestimonialsComponent } from "./testimonials.component";
import { TestimonialsRoutingModule } from "./testimonials-routing.module";


@NgModule({
    declarations: [
        TestimonialsComponent,
    ],
    imports: [
        CommonModule,
        TestimonialsRoutingModule,
    ],
})
export class TestimonialsModule { }
