import { AbstractEditorElementSettingsService } from "@modules/constructor/core/abstract/editor-element-settings.service";
import { AsyncPipe, JsonPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, HostBinding, HostListener, OnInit, ViewEncapsulation, inject } from "@angular/core";
import { ELEMENT_ID } from "@modules/constructor/components/edit-area/constants";
import { Observable, map } from "rxjs";
import { SitePageElementSettings, processSettingValueWithUnit } from "@modules/constructor/components/edit-area/types";
import { TabSelectionDirective, ToggleSelectionDirective } from "@shared-directives/editor";

@Component({
    selector: "lz-title-element",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    templateUrl: "./title.components.html",
    styleUrls: ["./title.component.scss"],
    imports: [JsonPipe, AsyncPipe],
    hostDirectives: [TabSelectionDirective, ToggleSelectionDirective],
})
export class TitleComponent implements OnInit {
    private readonly service = inject(AbstractEditorElementSettingsService);

    @HostBinding("class")
    public hostClasses = {
        "lz-title-element": true,
        "editor-element": true,
    };

    @HostBinding("$.style.height")
    @HostListener("$.style.height")
    public titleHeight$: Observable<string>;

    @HostBinding("$.style.width")
    @HostListener("$.style.width")
    public titleWidth$: Observable<string>;

    private elementID = inject(ELEMENT_ID);

    public titleText$: Observable<string>;

    private titleSettings$: Observable<SitePageElementSettings>;

    public ngOnInit(): void {
        this.titleSettings$ = this.service.selectSettings(this.elementID);

        this.titleHeight$ = this.titleSettings$.pipe(map(settings => processSettingValueWithUnit(settings.height)));

        this.titleWidth$ = this.titleSettings$.pipe(map(settings => processSettingValueWithUnit(settings.width)));

        this.titleText$ = this.titleSettings$.pipe(map(settings => settings.text ?? ""));
    }
}
