import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { CatalogComponent } from "./catalog.component";
import { CatalogRoutingModule } from "./catalog-routing.module";

@NgModule({
    declarations: [CatalogComponent],
    imports: [CommonModule, CatalogRoutingModule],
})
export class CatalogModule {}
