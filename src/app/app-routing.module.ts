import { BlogModule } from "./module/blog/blog.module";
import {CatalogModule} from "./module/catalog/catalog.module";
import { ContactModule } from "./module/contact/contact.module";
import { HomeModule } from "./module/home/home.module";
import { InfoModule } from "./module/info/info.module";
import { NgModule } from "@angular/core";
import { OrderModule } from "./module/order/order.module";
import { PersonModule } from "./module/person/person.module";
import { RouterModule, Routes } from "@angular/router";
import { TestimonialsModule } from "./module/testimonials/testimonials.module";

const routes: Routes = [
    {
        path: "",
        loadChildren: (): Promise<typeof HomeModule> => import("./module/home/home.module").then(module => module.HomeModule),
    },
    {
        path: "catalog",
        loadChildren: (): Promise<typeof CatalogModule> => import("./module/catalog/catalog.module").then(module => module.CatalogModule),
    },
    {
        path: "order",
        loadChildren: (): Promise<typeof OrderModule> => import("./module/order/order.module").then(module => module.OrderModule),
    },
    {
        path: "blog",
        loadChildren: (): Promise<typeof BlogModule> => import("./module/blog/blog.module").then(module => module.BlogModule),
    },
    {
        path: "testimonials",
        loadChildren: (): Promise<typeof TestimonialsModule> => import("./module/testimonials/testimonials.module").then(module => module.TestimonialsModule),
    },
    {
        path: "contact",
        loadChildren: (): Promise<typeof ContactModule> => import("./module/contact/contact.module").then(module => module.ContactModule),
    },
    {
        path: "info",
        loadChildren: (): Promise<typeof InfoModule> => import("./module/info/info.module").then(module => module.InfoModule),
    },
    {
        path: "person",
        loadChildren: (): Promise<typeof PersonModule> => import("./module/person/person.module").then(module => module.PersonModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
