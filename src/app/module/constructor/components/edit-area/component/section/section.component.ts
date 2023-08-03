import { AbstractEditAreaService } from "@modules/constructor/components/edit-area/edit-area.service";
import { AsyncPipe, NgComponentOutlet, NgForOf, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, HostListener, Input, OnInit, ViewEncapsulation, inject } from "@angular/core";
import { LZEditAreaItemComponent } from "@modules/constructor/components/edit-area/component/item/edit-area-item.component";
import { Observable } from "rxjs";
import { SitePageElement, SitePageElementType } from "@modules/constructor/components/edit-area/types";

@Component({
    selector: "lz-section-element",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    templateUrl: `./section.component.html`,
    styleUrls: ["section.component.scss"],
    imports: [NgComponentOutlet, NgForOf, LZEditAreaItemComponent, NgIf, AsyncPipe],
})
export class SectionComponent implements OnInit {
    @HostListener("click", ["$event"])
    public toggleSelection(event: MouseEvent): void {
        event.stopPropagation();
        this.service.updateSelection(this.elementID);
    }

    private readonly service = inject(AbstractEditAreaService);

    @Input({ required: true })
    public elementID: number;

    public element$: Observable<SitePageElement>;

    public sitePageElementType = SitePageElementType;

    public ngOnInit(): void {
        this.element$ = this.service.selectElement(this.elementID);
    }

    public addElement(type: SitePageElementType, event: MouseEvent): void {
        event.stopPropagation();
        this.service.addElement(this.elementID, type);
    }

    public _trackByChild(index: number, child: number): number {
        return child;
    }
}
