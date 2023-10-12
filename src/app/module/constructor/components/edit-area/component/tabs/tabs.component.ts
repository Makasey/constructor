import { ChangeDetectionStrategy, Component, HostBinding, HostListener, OnInit, ViewEncapsulation, inject } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Observable, map } from "rxjs";

import {
    AbstractEditorElementSettingsService,
    ELEMENT_ID,
    TabsPageElementSettings,
    processSettingValueWithUnit,
    processedCreatedTabsCount,
} from "@modules/constructor";
import { TabSelectionDirective, ToggleSelectionDirective } from "@shared-directives";

@Component({
    selector: "lz-tabs-element",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./tabs.component.html",
    styleUrls: ["./tabs.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    hostDirectives: [TabSelectionDirective, ToggleSelectionDirective],
})
export class TabsComponent implements OnInit {
    @HostBinding("class.lz-tabs-element")
    public hostClass = true;

    @HostBinding("$.style.height")
    @HostListener("$.style.height")
    public height$: Observable<string>;

    @HostBinding("$.style.width")
    @HostListener("$.style.width")
    public width$: Observable<string>;

    public count$: Observable<number[]>;

    public readonly ELEMENT_ID = inject(ELEMENT_ID);

    private readonly elementSettingsService = inject(AbstractEditorElementSettingsService);

    private settings$: Observable<TabsPageElementSettings> = this.elementSettingsService.selectSettings(this.ELEMENT_ID);

    public ngOnInit(): void {
        this.width$ = this.settings$.pipe(map(settings => processSettingValueWithUnit(settings.width)));

        this.height$ = this.settings$.pipe(map(settings => processSettingValueWithUnit(settings.height)));

        this.count$ = this.settings$.pipe(map(settings => processedCreatedTabsCount(settings.count)));
    }
}
