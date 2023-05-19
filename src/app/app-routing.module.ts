import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { BlogModule } from "@modules/blog/blog.module";
import { CatalogModule } from "@modules/catalog/catalog.module";
import { ContactModule } from "@modules/contact/contact.module";
import { HomeModule } from "@modules/home/home.module";
import { InfoModule } from "@modules/info/info.module";
import { OrderModule } from "@modules/order/order.module";
import { PersonModule } from "@modules/person/person.module";
import { TestimonialsModule } from "@modules/testimonials/testimonials.module";

const routes: Routes = [
    {
        path: "",
        loadChildren: (): Promise<typeof HomeModule> => import("@modules/home/home.module").then(module => module.HomeModule),
    },
    {
        path: "catalog",
        loadChildren: (): Promise<typeof CatalogModule> => import("@modules/catalog/catalog.module").then(module => module.CatalogModule),
    },
    {
        path: "order",
        loadChildren: (): Promise<typeof OrderModule> => import("@modules/order/order.module").then(module => module.OrderModule),
    },
    {
        path: "blog",
        loadChildren: (): Promise<typeof BlogModule> => import("@modules/blog/blog.module").then(module => module.BlogModule),
    },
    {
        path: "testimonials",
        loadChildren: (): Promise<typeof TestimonialsModule> =>
            import("@modules/testimonials/testimonials.module").then(module => module.TestimonialsModule),
    },
    {
        path: "contact",
        loadChildren: (): Promise<typeof ContactModule> => import("@modules/contact/contact.module").then(module => module.ContactModule),
    },
    {
        path: "info",
        loadChildren: (): Promise<typeof InfoModule> => import("@modules/info/info.module").then(module => module.InfoModule),
    },
    {
        path: "person",
        loadChildren: (): Promise<typeof PersonModule> => import("@modules/person/person.module").then(module => module.PersonModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
