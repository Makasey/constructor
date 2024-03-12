import {
    AbstractEditorElementActionsService,
    AbstractEditorElementSettingsService,
    Directions,
    EDITOR_SELECTED_ELEMENT,
    ELEMENT_ID,
    SpacerPageElementSettings,
    TitlePageElement,
    processBackgroundValue,
    processBorderSideData,
    processDirectionValue,
    processSettingValueWithUnit,
} from "@modules/constructor";
import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, HostBinding, HostListener, OnInit, ViewEncapsulation, inject } from "@angular/core";
import { Observable, map } from "rxjs";
import { TabSelectionDirective, ToggleSelectionDirective } from "@shared-directives";

@Component({
    selector: "lz-spacer",
    templateUrl: "./spacer.component.html",
    styleUrl: "./spacer.component.scss",
    standalone: true,
    hostDirectives: [TabSelectionDirective, ToggleSelectionDirective],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [AsyncPipe],
})
export class SpacerComponent implements OnInit {
    @HostBinding("class.lz-spacer")
    public hostClass = true;

    @HostBinding("$.style.height")
    @HostListener("$.style.height")
    public height$: Observable<string>;

    @HostBinding("$.style.width")
    @HostListener("$.style.width")
    public width$: Observable<string>;

    @HostBinding("$.style.margin")
    @HostListener("$.style.margin")
    public margin$: Observable<string>;

    @HostBinding("$.style.padding")
    @HostListener("$.style.padding")
    public padding$: Observable<string>;

    @HostBinding("$.style.background")
    @HostListener("$.style.background")
    public background$: Observable<string>;

    @HostBinding("$.style.border-radius")
    @HostListener("$.style.border-radius")
    public borderRadius$: Observable<string>;

    @HostBinding("$.style.border-left")
    @HostListener("$.style.border-left")
    public borderLeft$: Observable<string>;

    @HostBinding("$.style.border-right")
    @HostListener("$.style.border-right")
    public borderRight$: Observable<string>;

    @HostBinding("$.style.border-top")
    @HostListener("$.style.border-top")
    public borderTop$: Observable<string>;

    @HostBinding("$.style.border-bottom")
    @HostListener("$.style.border-bottom")
    public borderBottom$: Observable<string>;

    public readonly ELEMENT_ID = inject(ELEMENT_ID);

    private readonly abstractEditorElementSettingsService = inject(AbstractEditorElementSettingsService);

    private readonly spacerSettings$: Observable<SpacerPageElementSettings> = this.abstractEditorElementSettingsService.selectSettings(
        this.ELEMENT_ID,
    );

    private readonly editorActionsService = inject(AbstractEditorElementActionsService<TitlePageElement>);

    public readonly selectedElement$ = inject(EDITOR_SELECTED_ELEMENT);

    public ngOnInit(): void {
        this.width$ = this.spacerSettings$.pipe(map(settings => processSettingValueWithUnit(settings.width)));

        this.height$ = this.spacerSettings$.pipe(map(settings => processSettingValueWithUnit(settings.height)));

        this.margin$ = this.spacerSettings$.pipe(map(settings => processDirectionValue(settings.margin)));

        this.padding$ = this.spacerSettings$.pipe(map(settings => processDirectionValue(settings.padding)));

        this.background$ = this.spacerSettings$.pipe(map(settings => processBackgroundValue(settings.background)));

        this.borderLeft$ = this.spacerSettings$.pipe(map(settings => processBorderSideData(settings.border, Directions.LEFT)));

        this.borderRight$ = this.spacerSettings$.pipe(map(settings => processBorderSideData(settings.border, Directions.RIGHT)));

        this.borderTop$ = this.spacerSettings$.pipe(map(settings => processBorderSideData(settings.border, Directions.TOP)));

        this.borderBottom$ = this.spacerSettings$.pipe(map(settings => processBorderSideData(settings.border, Directions.BOTTOM)));

        this.borderRadius$ = this.spacerSettings$.pipe(map(settings => processDirectionValue(settings.border.borderRadius)));
    }

    public duplicate(): void {
        this.editorActionsService.duplicateElementById(this.ELEMENT_ID);
    }
}
