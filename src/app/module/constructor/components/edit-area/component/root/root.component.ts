import { AbstractEditAreaService } from "@modules/constructor/components/edit-area/edit-area.service";
import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from "@angular/core";
import { DeleteSelectedElementDirective, TabSelectionDirective, ToggleSelectionDirective } from "@shared-directives/editor";
import { ElementResolverDirective } from "@shared-directives/element-resolver/element-resolver.directive";
import { NgForOf } from "@angular/common";
import { ROOT_ELEMENT_ID } from "@modules/constructor/components/edit-area/types";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
    selector: "lz-root-element",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ["./root.component.scss"],
    templateUrl: "./root.component.html",
    imports: [NgForOf, ElementResolverDirective],
    hostDirectives: [ToggleSelectionDirective, DeleteSelectedElementDirective, TabSelectionDirective],
})
export class RootComponent {
    @HostBinding("class")
    public hostClass = {
        "lz-root-element": true,
        "editor-element": true,
    };

    constructor(private service: AbstractEditAreaService) {}

    public root = toSignal(this.service.selectElement(ROOT_ELEMENT_ID));

    public _trackById(index: number, item: number): number {
        return item;
    }
}
