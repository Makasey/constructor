import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation, input, output } from "@angular/core";

import { APDropdownFieldItem } from "@components";

@Component({
    selector: "ap-dropdown-field-item",
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: "./dropdown-field-item.component.html",
    encapsulation: ViewEncapsulation.None,
    styleUrls: ["./dropdown-field-item.component.scss"]
})
export class APDropdownFieldItemComponent {
    public readonly active = input(false);

    public readonly item = input<APDropdownFieldItem>();

    public readonly selectLabelKey = input("label");

    public readonly onItemClick = output<APDropdownFieldItem>();

    @HostBinding("class.dropdown-field-item")
    public hostClass = true;

    public _onItemClick(item: APDropdownFieldItem): void {
        this.active = !this.active();
        this.onItemClick.emit(item);
    }
}
