import { AbstractEditAreaService } from "@modules/constructor/components/edit-area/edit-area.service";
import { ChangeDetectionStrategy, Component, HostBinding, HostListener, ViewEncapsulation } from "@angular/core";
import { JsonPipe, NgForOf } from "@angular/common";
import { ROOT_ELEMENT_ID } from "@modules/constructor/components/edit-area/types";
import { SectionComponent } from "@modules/constructor/components/edit-area/component/section/section.component";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
    selector: "lz-root-element",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ["./root.component.scss"],
    templateUrl: "./root.component.html",
    imports: [JsonPipe, SectionComponent, NgForOf],
})
export class RootComponent {
    @HostListener("click")
    public toggleSelection(): void {
        this.service.updateSelection(ROOT_ELEMENT_ID);
    }

    @HostBinding("class.lz-root-element")
    public hostClass = true;

    constructor(private service: AbstractEditAreaService) {}

    public root = toSignal(this.service.selectElement(ROOT_ELEMENT_ID));

    public _trackById(index: number, item: number): number {
        return item;
    }
}
