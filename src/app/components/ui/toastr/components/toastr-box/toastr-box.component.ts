import { ChangeDetectionStrategy, Component, HostBinding } from "@angular/core";

import { LZToastrService } from "../../store";
import { LzToastrQuery } from "../../store";

@Component({
    selector: "lz-toastr-box",
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: "./toastr-box.component.html",
})
export class LZToastrBoxComponent {
    public _enabledDNDMode$ = this.toastrQuery.selectDNDMode$;

    @HostBinding("class.lz-toastr-box")
    public hostClass = true;

    constructor(private toastrService: LZToastrService, private toastrQuery: LzToastrQuery) {}

    public _changeEnableDNDMode(changeEvent: Event): void {
        const target = changeEvent.target as HTMLInputElement;

        this.toastrService.setEnableDNDMode(target.value as unknown as boolean);
    }
}
