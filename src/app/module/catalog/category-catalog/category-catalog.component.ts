import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "app-category-catalog",
    templateUrl: "./category-catalog.component.html",
    styleUrls: ["./category-catalog.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryCatalogComponent {}
