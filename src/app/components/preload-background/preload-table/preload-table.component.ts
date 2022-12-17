import { Component, Inject, OnInit } from "@angular/core";
import {PreloadBackgroundComponent} from "../../../directive/preload/types";

@Component({
    selector: "app-preload-table",
    templateUrl: "./preload-table.component.html",
    styleUrls: ["./preload-table.component.scss"],
})
export class PreloadTableComponent implements OnInit, PreloadBackgroundComponent<unknown> {

    test: unknown;
    constructor(@Inject("config") public config: Record<string, unknown>) {}

    ngOnInit(): void {
        console.log(this.config, this.test);
    }
}
