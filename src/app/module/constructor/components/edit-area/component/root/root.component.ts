import { AbstractEditAreaService } from "@modules/constructor/components/edit-area/edit-area.service";
import { ChangeDetectionStrategy, Component, HostBinding, HostListener, ViewEncapsulation, inject } from "@angular/core";
import { EDITOR_SELECTED_ELEMENT } from "@modules/constructor/providers/selected-element.provider";
import { ElementResolverDirective } from "@shared-directives/element-resolver/element-resolver.directive";
import { NgForOf } from "@angular/common";
import { ROOT_ELEMENT_ID } from "@modules/constructor/components/edit-area/types";
import { TabSelectionDirective } from "@shared-directives/editor";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
    selector: "lz-root-element",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ["./root.component.scss"],
    templateUrl: "./root.component.html",
    imports: [NgForOf, ElementResolverDirective],
    hostDirectives: [TabSelectionDirective],
})
export class RootComponent {
    private readonly selectedElement = toSignal(inject(EDITOR_SELECTED_ELEMENT), { initialValue: ROOT_ELEMENT_ID });

    @HostListener("click")
    public toggleSelection(): void {
        this.service.updateSelection(ROOT_ELEMENT_ID);
    }

    @HostListener("document:keydown.delete")
    public deleteElement(): void {
        this.service.deleteElement(this.selectedElement());
    }

    @HostBinding("class.lz-root-element")
    public hostClass = true;

    constructor(private service: AbstractEditAreaService) {}

    public root = toSignal(this.service.selectElement(ROOT_ELEMENT_ID));

    public _trackById(index: number, item: number): number {
        return item;
    }
}
