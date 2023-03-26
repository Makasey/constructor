import { ChangeDetectionStrategy, Component, HostBinding, Inject, ViewEncapsulation } from "@angular/core";
import { PRELOAD_COMPONENTS_CONFIG } from "../../../../directive/preload";

@Component({
    selector: "app-preload-product",
    templateUrl: "./preload-product.component.html",
    styleUrls: ["./preload-product.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class PreloadProductComponent {
    constructor(@Inject(PRELOAD_COMPONENTS_CONFIG) public config: Record<string, number>) {}

    @HostBinding("class.preload-product")
    public hostClass = true;
}
