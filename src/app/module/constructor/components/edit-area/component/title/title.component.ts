import {
    AbstractEditorElementActionsService,
    AbstractEditorElementSettingsService,
    ELEMENT_ID,
    ElementActionsComponent,
    TitlePageElement,
    TitlePageElementSettings,
    processBackgroundValue,
    processSettingValueWithUnit,
} from "@modules/constructor";
import { AsyncPipe, JsonPipe, NgIf, NgTemplateOutlet } from "@angular/common";
import { ChangeDetectionStrategy, Component, HostBinding, HostListener, OnInit, ViewEncapsulation, inject } from "@angular/core";
import { Observable, map } from "rxjs";
import { TabSelectionDirective, ToggleSelectionDirective } from "@shared-directives";

@Component({
    selector: "lz-title-element",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    templateUrl: "./title.component.html",
    styleUrls: ["./title.component.scss"],
    imports: [JsonPipe, AsyncPipe, NgTemplateOutlet, NgIf, ElementActionsComponent],
    hostDirectives: [TabSelectionDirective, ToggleSelectionDirective],
})
export class TitleComponent implements OnInit {
    @HostBinding("class")
    public readonly hostClasses = {
        "lz-title-element": true,
        "editor-element": true,
    };

    @HostBinding("$.style.min-height")
    @HostListener("$.style.min-height")
    public titleHeight$: Observable<string>;

    @HostBinding("$.style.width")
    @HostListener("$.style.width")
    public titleWidth$: Observable<string>;

    @HostBinding("$.style.color")
    @HostListener("$.style.color")
    public titleColor$: Observable<string>;

    @HostBinding("$.style.background")
    @HostListener("$.style.background")
    public titleBackground$: Observable<string>;

    public readonly ELEMENT_ID = inject(ELEMENT_ID);

    private readonly service = inject(AbstractEditorElementSettingsService);

    private readonly editorActionsService = inject(AbstractEditorElementActionsService<TitlePageElement>);

    public titleText$: Observable<string>;

    public element$: Observable<TitlePageElement>;

    private titleSettings$: Observable<TitlePageElementSettings>;

    public ngOnInit(): void {
        this.element$ = this.editorActionsService.selectElement(this.ELEMENT_ID);

        this.titleSettings$ = this.service.selectSettings(this.ELEMENT_ID);

        this.titleHeight$ = this.titleSettings$.pipe(map(settings => processSettingValueWithUnit(settings.height)));

        this.titleWidth$ = this.titleSettings$.pipe(map(settings => processSettingValueWithUnit(settings.width)));

        this.titleColor$ = this.titleSettings$.pipe(map(settings => settings.color));

        this.titleText$ = this.titleSettings$.pipe(map(settings => settings.text ?? ""));

        this.titleBackground$ = this.titleSettings$.pipe(
            map(settings => {
                return processBackgroundValue(settings.background);
            }),
        );
    }
}
