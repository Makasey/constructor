import { AbstractEditAreaService } from "@modules/constructor/components/edit-area/edit-area.service";
import { AsyncPipe, JsonPipe, NgComponentOutlet, NgForOf, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, HostBinding, HostListener, OnInit, ViewEncapsulation, inject } from "@angular/core";
import { EDITOR_SELECTED_ELEMENT } from "@modules/constructor/providers/selected-element.provider";
import {
    ELEMENT_ID,
    SitePageElement,
    SitePageElementSettings,
    SitePageElementType,
    processSettingValueWithUnit,
} from "@modules/constructor/components/edit-area/types";
import { LZEditAreaItemComponent } from "@modules/constructor/components/edit-area/component/item/edit-area-item.component";
import { Observable, map } from "rxjs";
import { TabSelectionDirective } from "@shared-directives/editor";

@Component({
    selector: "lz-section-element",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    templateUrl: `./section.component.html`,
    styleUrls: ["section.component.scss"],
    hostDirectives: [TabSelectionDirective],
    imports: [NgComponentOutlet, NgForOf, LZEditAreaItemComponent, NgIf, AsyncPipe, JsonPipe],
})
export class SectionComponent implements OnInit {
    @HostBinding("$.style.height")
    @HostListener("$.style.height")
    public sectionHeight$: Observable<string>;

    @HostBinding("$.style.width")
    @HostListener("$.style.width")
    public sectionWidth$: Observable<string>;

    @HostBinding("class.lz-section-element")
    public hostClass = true;

    @HostListener("click.stop", ["$event"])
    public toggleSelection(): void {
        this.service.updateSelection(this.ELEMENT_ID);
    }

    @HostBinding("$.class._selected")
    @HostListener("$.class._selected")
    public isSelected$: Observable<boolean>;

    private readonly service = inject(AbstractEditAreaService);

    public element$: Observable<SitePageElement> = new Observable();

    public readonly ELEMENT_ID = inject(ELEMENT_ID);

    public readonly selectedElement$ = inject(EDITOR_SELECTED_ELEMENT);

    public sitePageElementType = SitePageElementType;

    private sectionSettings$: Observable<SitePageElementSettings>;

    public ngOnInit(): void {
        this.element$ = this.service.selectElement(this.ELEMENT_ID);

        this.sectionSettings$ = this.service.selectSettings(this.ELEMENT_ID);

        this.isSelected$ = this.selectedElement$.pipe(map(selectedIndex => selectedIndex === this.ELEMENT_ID));

        this.sectionHeight$ = this.sectionSettings$.pipe(map(settings => processSettingValueWithUnit(settings.height)));

        this.sectionWidth$ = this.sectionSettings$.pipe(map(settings => processSettingValueWithUnit(settings.width)));
    }

    public addElement(type: SitePageElementType): void {
        this.service.addElement(type, this.ELEMENT_ID);
    }

    public _trackByChild(index: number, child: number): number {
        return child;
    }

    public deleteElement(): void {
        this.service.deleteElement(this.ELEMENT_ID);
    }
}
