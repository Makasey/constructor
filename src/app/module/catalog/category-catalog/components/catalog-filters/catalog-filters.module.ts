import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { APFormModule } from "app/components/ui/form";
import { PreloadDirectiveModule } from "app/directive/preload/preload.module";

import { AbstractCatalogFiltersService, DefaultCatalogFiltersService } from "./catalog-filters.service";
import { CatalogFiltersComponent } from "./catalog-filters.component";

@NgModule({
    declarations: [CatalogFiltersComponent],
    exports: [CatalogFiltersComponent],
    imports: [APFormModule, CommonModule, PreloadDirectiveModule],
    providers: [
        {
            provide: AbstractCatalogFiltersService,
            useClass: DefaultCatalogFiltersService,
        },
    ],
})
export class LZCatalogFiltersModule {}
