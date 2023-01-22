import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "lz-catalog-filters",
    templateUrl: "./catalog-filters.component.html",
    styleUrls: ["./catalog-filters.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogFiltersComponent {}
