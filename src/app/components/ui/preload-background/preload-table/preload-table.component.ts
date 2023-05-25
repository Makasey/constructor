import { ChangeDetectionStrategy, Component, Inject, OnInit } from "@angular/core";

import { PRELOAD_COMPONENTS_CONFIG } from "@shared-directives/preload";

@Component({
    selector: "lz-preload-table",
    templateUrl: "./preload-table.component.html",
    styleUrls: ["./preload-table.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LzPreloadTableComponent implements OnInit {
    constructor(@Inject(PRELOAD_COMPONENTS_CONFIG) public config: Record<string, unknown>) {}

    public ngOnInit(): void {
        console.log("%c Config:", "color: red; font-size: 20px;", this.config);
    }
}
