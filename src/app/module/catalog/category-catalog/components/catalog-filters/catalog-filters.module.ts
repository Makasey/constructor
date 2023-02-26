import { APFormModule } from "../../../../../components/form";
import { AbstractCatalogFiltersService, DefaultCatalogFiltersService } from "./catalog-filters.service";
import { CatalogFiltersComponent } from "./catalog-filters.component";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PreloadDirectiveModule } from "../../../../../directive/preload/preload.module";

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
