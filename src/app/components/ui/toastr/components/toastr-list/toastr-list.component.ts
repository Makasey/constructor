import { ChangeDetectionStrategy, Component, HostBinding } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ID } from "@datorama/akita";

import { enterAnimation } from "@core";

import { LZToastrItem, LZToastrItemComponent, LZToastrService, LzToastrQuery } from "@components";

@Component({
    selector: "lz-toastr-list",
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: "./toastr-list.component.html",
    imports: [CommonModule, LZToastrItemComponent],
    animations: [enterAnimation],
})
export class LZToastrListComponent {
    public _alwaysOnDisplay$ = this.toastrQuery.selectAlwaysOnDisplay$;

    public toastrItems$ = this.toastrQuery.selectToastrItems$;

    @HostBinding("class.lz-toastr-list")
    public hostClass = true;

    constructor(
        private toastrQuery: LzToastrQuery,
        private toastrService: LZToastrService,
    ) {}

    public _trackById(index: number, item: LZToastrItem): ID {
        return item.id!;
    }

    public _hideItem(itemId: ID | undefined): void {
        if (!itemId) {
            return;
        }

        this.toastrService.hideToastrItem(itemId);
    }

    public _removeItem(itemId: ID | undefined): void {
        if (!itemId) {
            return;
        }

        this.toastrService.removeToastrItem(itemId);
    }
}
