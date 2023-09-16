import { AbstractEditorElementActionsService } from "@modules/constructor/core/abstract/editor-element.service";
import { AbstractEditorElementSettingsService } from "@modules/constructor/core/abstract/editor-element-settings.service";
import { AsyncPipe, JsonPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, HostBinding, HostListener, OnInit, ViewEncapsulation, inject } from "@angular/core";
import { ELEMENT_ID } from "@modules/constructor/components/edit-area/constants";
import { Observable, map } from "rxjs";
import { TabSelectionDirective, ToggleSelectionDirective } from "@shared-directives/editor";
import { TitlePageElement, TitlePageElementSettings } from "@modules/constructor/components/edit-area/component/title/types";
import { processSettingValueWithUnit } from "@modules/constructor/components/edit-area/types";

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

    @HostBinding("$.style.color")
    @HostListener("$.style.color")
    public titleColor$: Observable<string>;

    @HostBinding("$.style.background-color")
    @HostListener("$.style.background-color")
    public titleBackgroundColor$: Observable<string>;

    private readonly editorActionsService = inject(AbstractEditorElementActionsService<TitlePageElement>);

    public titleText$: Observable<string>;

    public element$: Observable<TitlePageElement>;

    public readonly ELEMENT_ID = inject(ELEMENT_ID);

    private titleSettings$: Observable<TitlePageElementSettings>;

    public ngOnInit(): void {
        this.element$ = this.editorActionsService.selectElement(this.ELEMENT_ID);

        this.titleSettings$ = this.service.selectSettings(this.ELEMENT_ID);

        this.titleHeight$ = this.titleSettings$.pipe(map(settings => processSettingValueWithUnit(settings.height)));

        this.titleWidth$ = this.titleSettings$.pipe(map(settings => processSettingValueWithUnit(settings.width)));

        this.titleColor$ = this.titleSettings$.pipe(map(settings => settings.color));

        this.titleBackgroundColor$ = this.titleSettings$.pipe(map(settings => settings.backgroundColor));

        this.titleText$ = this.titleSettings$.pipe(map(settings => settings.text ?? ""));
    }
}
