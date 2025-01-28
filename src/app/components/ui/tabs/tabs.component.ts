import { AfterContentInit, ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation, contentChildren } from "@angular/core";

import { CommonModule, NgClass, NgTemplateOutlet } from "@angular/common";
import { TabsItemComponent } from "@components";

@Component({
    selector: "lz-tabs",
    templateUrl: "./tabs.component.html",
    styleUrls: ["./tabs.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [NgClass, NgTemplateOutlet, CommonModule, NgClass],
})
export class LzTabsComponent implements AfterContentInit {
    @HostBinding("class.lz-tabs")
    public hostClass = true;

    public readonly tabs = contentChildren(TabsItemComponent);

    public activeComponent: TabsItemComponent;

    public ngAfterContentInit(): void {
        this.activeComponent = this.tabs().at(0)!;
    }

    public activateTab(tab: TabsItemComponent): void {
        this.activeComponent = tab;
    }
}
