import { AbstractEditAreaService, ROOT_ELEMENT_ID } from "@modules/constructor";
import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from "@angular/core";
import { DeleteSelectedElementDirective, TabSelectionDirective } from "@shared-directives/editor";
import { ElementResolverDirective } from "@shared-directives/element-resolver/element-resolver.directive";
import { NgForOf } from "@angular/common";
import { ToggleSelectionDirective } from "@shared-directives/editor/toggle-selection/toggle-selection.directive";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
    selector: "lz-root-element",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ["./root.component.scss"],
    templateUrl: "./root.component.html",
    imports: [NgForOf, ElementResolverDirective],
    hostDirectives: [TabSelectionDirective, DeleteSelectedElementDirective, ToggleSelectionDirective],
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
