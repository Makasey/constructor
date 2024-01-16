import {
    AbstractEditorElementSettingsService,
    BorderType,
    Directions,
    DividerPageElementSettings,
    ELEMENT_ID,
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
    selector: "lz-divider",
    templateUrl: "./divider.component.html",
    styleUrl: "./divider.component.scss",
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    hostDirectives: [TabSelectionDirective, ToggleSelectionDirective],
    imports: [AsyncPipe],
})
export class DividerComponent implements OnInit {
    @HostBinding("class.lz-divider")
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

    @HostBinding("$.style.align-items")
    @HostListener("$.style.align-items")
    public alignItems$: Observable<string>;

    public text$: Observable<string>;

    public lineBorderType$: Observable<BorderType>;

    private readonly ELEMENT_ID = inject(ELEMENT_ID);

    private readonly abstractEditorElementSettingsService = inject(AbstractEditorElementSettingsService);

    private readonly dividerSettings$: Observable<DividerPageElementSettings> = this.abstractEditorElementSettingsService.selectSettings(
        this.ELEMENT_ID,
    );

    public ngOnInit(): void {
        this.width$ = this.dividerSettings$.pipe(map(settings => processSettingValueWithUnit(settings.width)));

        this.height$ = this.dividerSettings$.pipe(map(settings => processSettingValueWithUnit(settings.height)));

        this.margin$ = this.dividerSettings$.pipe(map(settings => processDirectionValue(settings.margin)));

        this.padding$ = this.dividerSettings$.pipe(map(settings => processDirectionValue(settings.padding)));

        this.background$ = this.dividerSettings$.pipe(map(settings => processBackgroundValue(settings.background)));

        this.borderLeft$ = this.dividerSettings$.pipe(map(settings => processBorderSideData(settings.border, Directions.LEFT)));

        this.borderRight$ = this.dividerSettings$.pipe(map(settings => processBorderSideData(settings.border, Directions.RIGHT)));

        this.borderTop$ = this.dividerSettings$.pipe(map(settings => processBorderSideData(settings.border, Directions.TOP)));

        this.borderBottom$ = this.dividerSettings$.pipe(map(settings => processBorderSideData(settings.border, Directions.BOTTOM)));

        this.borderRadius$ = this.dividerSettings$.pipe(map(settings => processDirectionValue(settings.border.borderRadius)));

        this.alignItems$ = this.dividerSettings$.pipe(map(settings => settings.alignItems));

        this.text$ = this.dividerSettings$.pipe(map(settings => settings.text));

        this.lineBorderType$ = this.dividerSettings$.pipe(map(settings => settings.lineBorderType));
    }
}
