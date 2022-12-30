import { BlogComponent } from "./blog.component";
import { BlogRoutingModule } from "./blog-routing.module";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule({
    declarations: [BlogComponent],
    imports: [CommonModule, BlogRoutingModule],
})
export class BlogModule {}
