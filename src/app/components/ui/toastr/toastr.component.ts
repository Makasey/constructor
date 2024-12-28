import { ChangeDetectionStrategy, Component, HostBinding } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LZInitVarDirective } from "@shared-directives";
import { LZToastrBoxComponent, LZToastrListComponent, LZToastrService, LZToastrStore, LzToastrQuery } from "@components";
import { enterAnimation } from "@core";

@Component({
    selector: "lz-toastr",
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ["./toastr.component.scss"],
    templateUrl: "./toastr.component.html",
    imports: [LZToastrBoxComponent, LZToastrListComponent, LZInitVarDirective, CommonModule],
    providers: [LZToastrStore, LZToastrService, LzToastrQuery],
    animations: [enterAnimation],
})
export class LZToastrComponent {
    public _alwaysOnDisplay$ = this.toastrQuery.selectAlwaysOnDisplay$;
    public _enableDNDMode$ = this.toastrQuery.selectDNDMode$;

    @HostBinding("class.lz-toastr")
    public hostClass = true;

    constructor(private toastrQuery: LzToastrQuery) {}
}
