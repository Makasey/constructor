import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output, ViewEncapsulation } from "@angular/core";

import { APDropdownFieldItem } from "../../types";

@Component({
    selector: "ap-dropdown-field-item",
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: "./dropdown-field-item.component.html",
    encapsulation: ViewEncapsulation.None,
    styleUrls: ["./dropdown-field-item.component.scss"],
})
export class APDropdownFieldItemComponent {
    @Input()
    public active = false;

    @Input()
    public item: APDropdownFieldItem;

    @Input()
    public selectLabelKey = "label";

    @Output()
    public readonly onItemClick: EventEmitter<APDropdownFieldItem> = new EventEmitter<APDropdownFieldItem>();

    @HostBinding("class.dropdown-field-item")
    public hostClass = true;

    public _onItemClick(item: APDropdownFieldItem): void {
        this.active = !this.active;
        this.onItemClick.emit(item);
    }
}
