import {
    AbstractEditAreaService,
    EDITOR_SELECTED_ELEMENT,
    ELEMENT_ID,
    LZEditAreaItemComponent,
    SitePageElement,
    SitePageElementSettings,
    SitePageElementType,
    processSettingValueWithUnit,
} from "@modules/constructor";
import { AsyncPipe, JsonPipe, NgComponentOutlet, NgForOf, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, HostBinding, HostListener, OnInit, ViewEncapsulation, inject } from "@angular/core";
import { Observable, map } from "rxjs";
import { TabSelectionDirective, ToggleSelectionDirective } from "@shared-directives/editor";

@Component({
    selector: "lz-section-element",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    templateUrl: `./section.component.html`,
    styleUrls: ["section.component.scss"],
    hostDirectives: [TabSelectionDirective, ToggleSelectionDirective],
    imports: [NgComponentOutlet, NgForOf, LZEditAreaItemComponent, NgIf, AsyncPipe, JsonPipe],
})
export class SectionComponent implements OnInit {
    @HostBinding("$.style.height")
    @HostListener("$.style.height")
    public sectionHeight$: Observable<string>;

    @HostBinding("$.style.width")
    @HostListener("$.style.width")
    public sectionWidth$: Observable<string>;

    @HostBinding("class")
    public hostClass = {
        "lz-section-element": true,
        "editor-element": true,
    };

    private readonly service = inject(AbstractEditAreaService);

    public element$: Observable<SitePageElement> = new Observable();

    public readonly ELEMENT_ID = inject(ELEMENT_ID);

    public readonly selectedElement$ = inject(EDITOR_SELECTED_ELEMENT);

    public sitePageElementType = SitePageElementType;

    private sectionSettings$: Observable<SitePageElementSettings>;

    public ngOnInit(): void {
        this.element$ = this.service.selectElement(this.ELEMENT_ID);

        this.sectionSettings$ = this.service.selectSettings(this.ELEMENT_ID);

        this.sectionHeight$ = this.sectionSettings$.pipe(map(settings => processSettingValueWithUnit(settings.height)));

        this.sectionWidth$ = this.sectionSettings$.pipe(map(settings => processSettingValueWithUnit(settings.width)));
    }

    public addElement(type: SitePageElementType): void {
        this.service.addElement(type, this.ELEMENT_ID);
    }

    public _trackByChild(_: number, child: number): number {
        return child;
    }

    public deleteElement(): void {
        this.service.deleteElement(this.ELEMENT_ID);
    }
}
