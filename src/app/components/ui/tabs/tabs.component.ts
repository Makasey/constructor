import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, HostBinding, QueryList, ViewEncapsulation } from "@angular/core";
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
export class LzTabsComponent implements AfterContentInit {
    @HostBinding("class.lz-tabs")
    public hostClass = true;

    @ContentChildren(TabsItemComponent)
    public tabs: QueryList<TabsItemComponent>;

    public activeComponent: TabsItemComponent;

    public ngAfterContentInit(): void {
        this.activeComponent = this.tabs?.first;
    }

    public activateTab(tab: TabsItemComponent): void {
        this.activeComponent = tab;
    }

    public trackByTab(_: number, tab: TabsItemComponent): string {
        return tab.title;
    }
}
