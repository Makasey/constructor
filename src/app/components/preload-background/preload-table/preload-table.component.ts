import { ChangeDetectionStrategy, Component, Inject, OnInit } from "@angular/core";
import { PreloadBackgroundComponent } from "../../../directive/preload/types";

@Component({
    selector: "app-preload-table",
    templateUrl: "./preload-table.component.html",
    styleUrls: ["./preload-table.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreloadTableComponent implements OnInit, PreloadBackgroundComponent<unknown> {
    public test: unknown;
    constructor(@Inject("config") public config: Record<string, unknown>) {}

    public ngOnInit(): void {
        console.log(this.config, this.test);
    }
}
