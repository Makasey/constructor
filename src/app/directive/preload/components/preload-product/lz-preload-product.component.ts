import { ChangeDetectionStrategy, Component, HostBinding, Inject, ViewEncapsulation } from "@angular/core";

import { NumberToArrayPipe } from "@shared-pipes";
import { PRELOAD_COMPONENTS_CONFIG } from "@shared-directives";

@Component({
    selector: "lz-preload-product",
    templateUrl: "./lz-preload-product.component.html",
    styleUrls: ["./lz-preload-product.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [NumberToArrayPipe],
})
export class LzPreloadProductComponent {
    constructor(@Inject(PRELOAD_COMPONENTS_CONFIG) public config: Record<string, number>) {}

    @HostBinding("class.preload-product")
    public hostClass = true;
}
