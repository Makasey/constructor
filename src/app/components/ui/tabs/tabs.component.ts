import { ChangeDetectionStrategy, Component, ContentChildren, HostBinding, ViewEncapsulation } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TabsItemComponent } from "@components/ui/tabs/components/tabs-item/tabs-item.component";

@Component({
    selector: "lz-tabs",
    templateUrl: "./tabs.component.html",
    styleUrls: ["./tabs.component.scss"],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [CommonModule, TabsItemComponent],
})
export class LzTabsComponent {
    @HostBinding("class.lz-tabs")
    public hostClass = true;

    @ContentChildren(TabsItemComponent)
    public tabsItems: TabsItemComponent[] | undefined;
}
