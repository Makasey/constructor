import { AbstractEditAreaService } from "@modules/constructor/components/edit-area/edit-area.service";
import { AsyncPipe, JsonPipe, NgForOf, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation, inject } from "@angular/core";
import { ElementResolverDirective } from "@shared-directives/element-resolver/element-resolver.directive";
import { Observable } from "rxjs";
import { SitePageElement } from "@modules/constructor/components/edit-area/types";

@Component({
    selector: "lz-edit-area-item",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    styleUrls: ["./edit-area-item.component.scss"],
    templateUrl: "./edit-area-item.component.html",
    imports: [AsyncPipe, JsonPipe, NgForOf, NgIf, ElementResolverDirective],
})
export class LZEditAreaItemComponent implements OnInit {
    @Input({ required: true })
    public elementID: number;

    private readonly service = inject(AbstractEditAreaService);

    public element$: Observable<SitePageElement>;

    public ngOnInit(): void {
        this.element$ = this.service.selectElement(this.elementID);
    }
}
