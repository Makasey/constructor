import { ChangeDetectionStrategy, Component, HostBinding } from "@angular/core";

import { LzToastrQuery } from "@components";
import { enterAnimation } from "@core";

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
