import { AbstractEditAreaService } from "@modules/constructor/components/edit-area/edit-area.service";
import { AsyncPipe, JsonPipe, NgForOf, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, HostBinding, HostListener, Input, ViewEncapsulation, inject } from "@angular/core";
import { ElementResolverDirective } from "@shared-directives/element-resolver/element-resolver.directive";

@Component({
    selector: "lz-edit-area-item",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    styleUrls: ["./edit-area-item.component.scss"],
    templateUrl: "./edit-area-item.component.html",
    imports: [AsyncPipe, JsonPipe, NgForOf, NgIf, ElementResolverDirective],
})
export class LZEditAreaItemComponent {
    @HostBinding("class.lz-edit-area-item")
    public hostClass = true;

    @HostListener("click.stop", ["$event"])
    public toggleSelection(): void {
        this.service.updateSelection(this.elementID);
    }

    @Input({ required: true })
    public elementID: number;

    @Input({ required: true })
    public parentID: number;

    private readonly service = inject(AbstractEditAreaService);

    public deleteElement(): void {
        this.service.deleteElement(this.parentID, this.elementID);
    }
}
