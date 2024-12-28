import { ChangeDetectionStrategy, Component, HostBinding, Inject, ViewEncapsulation } from "@angular/core";

import { NumberToArrayPipe } from "@shared-pipes";
import { PRELOAD_COMPONENTS_CONFIG } from "@shared-directives";

@Component({
    selector: "lz-preload-filters",
    templateUrl: "./preload-filters.component.html",
    styleUrls: ["./preload-filters.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [NumberToArrayPipe],
})
export class LzPreloadFiltersComponent {
    constructor(@Inject(PRELOAD_COMPONENTS_CONFIG) public config: Record<string, number>) {}

    @HostBinding("class.preload-filter")
    public hostClass = true;
}
