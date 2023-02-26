import { ChangeDetectionStrategy, Component, HostBinding, Inject, ViewEncapsulation } from "@angular/core";
import { PRELOAD_COMPONENTS_CONFIG } from "../../../directive/preload";

@Component({
    selector: "lz-preload-filters",
    templateUrl: "./preload-filters.component.html",
    styleUrls: ["./preload-filters.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class LzPreloadFiltersComponent {
    constructor(@Inject(PRELOAD_COMPONENTS_CONFIG) public config: Record<string, number>) {}

    @HostBinding("class.preload-filter")
    public hostClass = true;
}
