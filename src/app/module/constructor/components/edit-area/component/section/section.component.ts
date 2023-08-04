import { AbstractEditAreaService } from "@modules/constructor/components/edit-area/edit-area.service";
import { AsyncPipe, JsonPipe, NgComponentOutlet, NgForOf, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, HostBinding, HostListener, Input, OnInit, ViewEncapsulation, inject } from "@angular/core";
import { ELEMENT_ID, SitePageElement, SitePageElementType, processSettingValueWithUnit } from "@modules/constructor/components/edit-area/types";
import { LZEditAreaItemComponent } from "@modules/constructor/components/edit-area/component/item/edit-area-item.component";
import { Observable, map } from "rxjs";
import { filterNilValue } from "@datorama/akita";

@Component({
    selector: "lz-section-element",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    templateUrl: `./section.component.html`,
    styleUrls: ["section.component.scss"],
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
        this.service.updateSelection(this.ELEMENT_ID ?? this.elementID);
    }

    private readonly service = inject(AbstractEditAreaService);

    @Input({ required: true })
    public elementID: number;

    public element$: Observable<SitePageElement> = new Observable();

    public readonly ELEMENT_ID = inject(ELEMENT_ID, { optional: true });

    public sitePageElementType = SitePageElementType;

    public ngOnInit(): void {
        this.element$ = this.service.selectElement(this.ELEMENT_ID ?? this.elementID);
        this.sectionHeight$ = this.element$.pipe(
            filterNilValue(),
            map(element => processSettingValueWithUnit(element.settings.height)),
        );

        this.sectionWidth$ = this.element$.pipe(
            filterNilValue(),
            map(element => processSettingValueWithUnit(element.settings.width)),
        );
    }

    public addElement(type: SitePageElementType): void {
        this.service.addElement(this.ELEMENT_ID ?? this.elementID, type);
    }

    public _trackByChild(index: number, child: number): number {
        return child;
    }
}
