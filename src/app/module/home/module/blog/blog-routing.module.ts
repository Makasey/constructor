import { BlogComponent } from "./blog.component";
import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";

const ROUTES: Route[] = [
    {
        path: "",
        component: BlogComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class BlogRoutingModule {}
