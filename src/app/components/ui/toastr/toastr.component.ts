import { ChangeDetectionStrategy, Component, HostBinding } from "@angular/core";

import { enterAnimation } from "app/core/animations/animations";

import { LzToastrQuery } from "./store";

@Component({
    selector: "lz-toastr",
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ["./toastr.component.scss"],
    templateUrl: "./toastr.component.html",
    animations: [enterAnimation],
})
export class LZToastrComponent {
    public _alwaysOnDisplay$ = this.toastrQuery.selectAlwaysOnDisplay$;
    public _enableDNDMode$ = this.toastrQuery.selectDNDMode$;

    @HostBinding("class.lz-toastr")
    public hostClass = true;

    constructor(private toastrQuery: LzToastrQuery) {}
}
