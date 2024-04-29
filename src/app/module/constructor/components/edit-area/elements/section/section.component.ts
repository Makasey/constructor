import {
    AbstractEditorElementActionsService,
    AbstractEditorElementSettingsService,
    AbstractEditorSelectionService,
    AbstractSectionEditorActionsService,
    ColumnStructure,
    Directions,
    EDITOR_SELECTED_ELEMENT,
    ELEMENT_ID,
    SECTION_PROVIDERS,
    SectionPageElement,
    SectionPageElementSettings,
    SectionSelectionService,
    SitePageElementType,
    columnStructureElements,
    processBackgroundValue,
    processBorderSideData,
    processDirectionValue,
    processSettingValueWithUnit,
} from "@modules/constructor";
import { ChangeDetectionStrategy, Component, HostBinding, HostListener, OnInit, ViewEncapsulation, inject } from "@angular/core";
import { ElementResolverDirective, TabSelectionDirective, ToggleSelectionDirective } from "@shared-directives";
import { ImageLinkPipe } from "@shared-pipes";
import { Observable, map } from "rxjs";
import { LZEditorElement } from "@modules/constructor";

@Component({
    selector: "lz-section-element",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    templateUrl: `./section.component.html`,
    styleUrls: ["section.component.scss"],
    hostDirectives: [TabSelectionDirective, ToggleSelectionDirective],
    providers: [...SECTION_PROVIDERS],
    imports: [ElementResolverDirective, ImageLinkPipe, LZEditorElement],
})
export class SectionComponent implements OnInit {
    @HostBinding("$.style.min-height")
    @HostListener("$.style.min-height")
    public sectionHeight$: Observable<string>;

    @HostBinding("$.style.width")
    @HostListener("$.style.width")
    public sectionWidth$: Observable<string>;

    @HostBinding("$.style.color")
    @HostListener("$.style.color")
    public sectionColor$: Observable<string>;

    @HostBinding("$.style.background")
    @HostListener("$.style.background")
    public sectionBackground$: Observable<string>;

    @HostBinding("$.style.padding")
    @HostListener("$.style.padding")
    public sectionPadding$: Observable<string>;

    @HostBinding("$.style.margin")
    @HostListener("$.style.margin")
    public sectionMargin$: Observable<string>;

    @HostBinding("$.style.letter-spacing")
    @HostListener("$.style.letter-spacing")
    public sectionLetterSpacing$: Observable<string>;

    @HostBinding("$.style.opacity")
    @HostListener("$.style.opacity")
    public sectionOpacity$: Observable<number>;

    @HostBinding("$.style.gap")
    @HostListener("$.style.gap")
    public gap$: Observable<string>;

    @HostBinding("$.style.justify-content")
    @HostListener("$.style.justify-content")
    public justifyContent$: Observable<string>;

    @HostBinding("$.style.flex-wrap")
    @HostListener("$.style.flex-wrap")
    public flexWrap$: Observable<string>;

    @HostBinding("$.style.align-items")
    @HostListener("$.style.align-items")
    public alignItems$: Observable<string>;

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

    @HostBinding("class")
    public readonly classes = {
        "editor-element": true,
        "lz-section-element": true,
    };

    private readonly service = inject(AbstractEditorElementSettingsService);

    private readonly editorActionsService = inject(AbstractEditorElementActionsService<SectionPageElement>) as AbstractSectionEditorActionsService;

    private readonly selectionService = inject(AbstractEditorSelectionService) as SectionSelectionService;

    public element$: Observable<SectionPageElement> = new Observable();

    public readonly ELEMENT_ID = inject(ELEMENT_ID);

    public readonly selectedElement = inject(EDITOR_SELECTED_ELEMENT);

    public readonly columnStructureElement = ColumnStructure;

    public readonly columnStructureElements = columnStructureElements;

    public readonly sitePageElementType = SitePageElementType;

    private sectionSettings$: Observable<SectionPageElementSettings>;

    public ngOnInit(): void {
        this.element$ = this.editorActionsService.selectElement(this.ELEMENT_ID);

        this.sectionSettings$ = this.service.selectSettings(this.ELEMENT_ID);

        this.sectionHeight$ = this.sectionSettings$.pipe(map(settings => processSettingValueWithUnit(settings.height)));

        this.sectionWidth$ = this.sectionSettings$.pipe(map(settings => processSettingValueWithUnit(settings.width)));

        this.sectionColor$ = this.sectionSettings$.pipe(map(settings => settings.color));

        this.sectionBackground$ = this.sectionSettings$.pipe(map(settings => processBackgroundValue(settings.background)));

        this.sectionPadding$ = this.sectionSettings$.pipe(map(settings => processDirectionValue(settings.padding)));

        this.sectionMargin$ = this.sectionSettings$.pipe(map(settings => processDirectionValue(settings.margin)));

        this.sectionLetterSpacing$ = this.sectionSettings$.pipe(map(settings => processSettingValueWithUnit(settings.letterSpacing)));

        this.sectionOpacity$ = this.sectionSettings$.pipe(map(settings => settings.opacity));

        this.gap$ = this.sectionSettings$.pipe(map(settings => processSettingValueWithUnit(settings.gap)));

        this.justifyContent$ = this.sectionSettings$.pipe(map(settings => settings.justifyContent));

        this.flexWrap$ = this.sectionSettings$.pipe(map(settings => settings.flexWrap));

        this.alignItems$ = this.sectionSettings$.pipe(map(settings => settings.alignItems));

        this.borderLeft$ = this.sectionSettings$.pipe(map(settings => processBorderSideData(settings.border, Directions.LEFT)));

        this.borderRight$ = this.sectionSettings$.pipe(map(settings => processBorderSideData(settings.border, Directions.RIGHT)));

        this.borderTop$ = this.sectionSettings$.pipe(map(settings => processBorderSideData(settings.border, Directions.TOP)));

        this.borderBottom$ = this.sectionSettings$.pipe(map(settings => processBorderSideData(settings.border, Directions.BOTTOM)));

        this.borderRadius$ = this.sectionSettings$.pipe(map(settings => processDirectionValue(settings.border.borderRadius)));
    }

    public addElement(type: SitePageElementType): void {
        this.editorActionsService.addElementByType(type, this.ELEMENT_ID);
    }

    public _trackByChild(_: number, child: string): string {
        return child;
    }

    public deleteElement(): void {
        this.editorActionsService.deleteElement(this.ELEMENT_ID);
    }

    public duplicateElement(): void {
        this.editorActionsService.duplicateElementById(this.ELEMENT_ID);
    }

    public chooseStructure(type: ColumnStructure): void {
        this.selectionService.updateSectionSelection(this.ELEMENT_ID);
        this.editorActionsService.chooseColumnStructureType(this.ELEMENT_ID, type);
    }

    public selectElement(): void {
        this.selectionService.updateSectionSelection(this.ELEMENT_ID);
    }
}
