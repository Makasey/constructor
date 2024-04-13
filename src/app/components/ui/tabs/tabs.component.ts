import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, HostBinding, QueryList, ViewEncapsulation } from "@angular/core";

import { CommonModule, NgClass, NgTemplateOutlet } from "@angular/common";
import { TabsItemComponent } from "@components";

@Component({
    selector: "lz-tabs",
    templateUrl: "./tabs.component.html",
    styleUrls: ["./tabs.component.scss"],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [TabsItemComponent, NgClass, NgTemplateOutlet, CommonModule, NgClass],
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
}
