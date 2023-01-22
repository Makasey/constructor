import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "lz-catalog-products",
    templateUrl: "./catalog-products.component.html",
    styleUrls: ["./catalog-products.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogProductsComponent {}
