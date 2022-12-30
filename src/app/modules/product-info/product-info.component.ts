import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "lz-product-info",
    templateUrl: "./product-info.component.html",
    styleUrls: ["./product-info.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LzProductInfoComponent {}
