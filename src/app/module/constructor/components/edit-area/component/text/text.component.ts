import {
    AbstractEditorElementActionsService,
    AbstractEditorElementSettingsService,
    ELEMENT_ID,
    TextPageElement,
    TextPageElementSettings,
    processSettingValueWithUnit,
} from "@modules/constructor";
import { AsyncPipe, JsonPipe, NgIf, NgTemplateOutlet } from "@angular/common";
import { ChangeDetectionStrategy, Component, HostBinding, HostListener, OnInit, ViewEncapsulation, inject } from "@angular/core";
import { Observable, map } from "rxjs";
import { TabSelectionDirective, ToggleSelectionDirective } from "@shared-directives";

@Component({
    selector: "lz-text-element",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    templateUrl: "./text.component.html",
    styleUrls: ["./text.component.scss"],
    imports: [JsonPipe, AsyncPipe, NgTemplateOutlet, NgIf],
    hostDirectives: [TabSelectionDirective, ToggleSelectionDirective],
})
export class TextComponent implements OnInit {
    private readonly service = inject(AbstractEditorElementSettingsService);

    @HostBinding("class")
    public hostClasses = {
        "lz-title-element": true,
        "editor-element": true,
    };

    @HostBinding("$.style.height")
    @HostListener("$.style.height")
    public textHeight$: Observable<string>;

    @HostBinding("$.style.width")
    @HostListener("$.style.width")
    public textWidth$: Observable<string>;

    @HostBinding("$.style.color")
    @HostListener("$.style.color")
    public textColor$: Observable<string>;

    @HostBinding("$.style.background-color")
    @HostListener("$.style.background-color")
    public textBackgroundColor$: Observable<string>;

    private readonly editorActionsService = inject(AbstractEditorElementActionsService<TextPageElement>);

    public textText$: Observable<string>;

    public element$: Observable<TextPageElement>;

    public readonly ELEMENT_ID = inject(ELEMENT_ID);

    private textSettings$: Observable<TextPageElementSettings>;

    public ngOnInit(): void {
        this.element$ = this.editorActionsService.selectElement(this.ELEMENT_ID);

        this.textSettings$ = this.service.selectSettings(this.ELEMENT_ID);

        this.textHeight$ = this.textSettings$.pipe(map(settings => processSettingValueWithUnit(settings.height)));

        this.textWidth$ = this.textSettings$.pipe(map(settings => processSettingValueWithUnit(settings.width)));

        this.textColor$ = this.textSettings$.pipe(map(settings => settings.color));

        this.textBackgroundColor$ = this.textSettings$.pipe(map(settings => settings.backgroundColor));

        this.textText$ = this.textSettings$.pipe(map(settings => settings.text ?? ""));
    }
}
