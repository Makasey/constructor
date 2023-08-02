import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TestimonialsComponent } from "./testimonials.component";

const ROUTES: Routes = [
    {
        path: "",
        component: TestimonialsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class TestimonialsRoutingModule {}
