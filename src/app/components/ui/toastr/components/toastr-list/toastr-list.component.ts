import { ChangeDetectionStrategy, Component, HostBinding } from "@angular/core";

import { ID } from "@datorama/akita";

import { enterAnimation } from "src/app/core/animations/animations";

import { LZToastrItem } from "../../types";
import { LzToastrQuery, LZToastrService } from "../../store";

@Component({
    selector: "lz-toastr-list",
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: "./toastr-list.component.html",
    animations: [enterAnimation],
})
export class LZToastrListComponent {
    public _alwaysOnDisplay$ = this.toastrQuery.selectAlwaysOnDisplay$;

    public toastrItems$ = this.toastrQuery.selectToastrItems$;

    @HostBinding("class.lz-toastr-list")
    public hostClass = true;

    constructor(private toastrQuery: LzToastrQuery, private toastrService: LZToastrService) {}

    public _trackById(index: number, item: LZToastrItem): ID {
        return item.id!;
    }

    public _hideItem(itemId: ID): void {
        this.toastrService.hideToastrItem(itemId);
    }

    public _removeItem(itemId: ID): void {
        this.toastrService.removeToastrItem(itemId);
    }
}
