import { HomeComponent } from "./home.component";
import { HomeInnerComponent } from "@modules/home/home-inner.component";
import { NgModule } from "@angular/core";

import { BlogModule } from "@modules/home/module/blog/blog.module";
import { CatalogModule } from "@modules/home/module/catalog/catalog.module";
import { ContactModule } from "@modules/home/module/contact/contact.module";
import { InfoModule } from "@modules/home/module/info/info.module";
import { OrderModule } from "@modules/home/module/order/order.module";
import { PersonModule } from "@modules/home/module/person/person.module";
import { Route, RouterModule } from "@angular/router";
import { TestimonialsModule } from "@modules/home/module/testimonials/testimonials.module";

const ROUTES: Route[] = [
    {
        path: "",
        component: HomeComponent,
        children: [
            {
                path: "",
                component: HomeInnerComponent,
            },
            {
                path: "catalog",
                loadChildren: (): Promise<typeof CatalogModule> =>
                    import("@modules/home/module/catalog/catalog.module").then(module => module.CatalogModule),
            },
            {
                path: "order",
                loadChildren: (): Promise<typeof OrderModule> => import("@modules/home/module/order/order.module").then(module => module.OrderModule),
            },
            {
                path: "blog",
                loadChildren: (): Promise<typeof BlogModule> => import("@modules/home/module/blog/blog.module").then(module => module.BlogModule),
            },
            {
                path: "testimonials",
                loadChildren: (): Promise<typeof TestimonialsModule> =>
                    import("@modules/home/module/testimonials/testimonials.module").then(module => module.TestimonialsModule),
            },
            {
                path: "contact",
                loadChildren: (): Promise<typeof ContactModule> =>
                    import("@modules/home/module/contact/contact.module").then(module => module.ContactModule),
            },
            {
                path: "info",
                loadChildren: (): Promise<typeof InfoModule> => import("@modules/home/module/info/info.module").then(module => module.InfoModule),
            },
            {
                path: "account",
                loadChildren: (): Promise<typeof PersonModule> =>
                    import("@modules/home/module/person/person.module").then(module => module.PersonModule),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class HomeRoutingModule {}
