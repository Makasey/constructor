import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from "@angular/core";
import { NgForOf } from "@angular/common";
import { toSignal } from "@angular/core/rxjs-interop";

import { AbstractEditorElementActionsService, SectionPageElement } from "@modules/constructor";
import { DeleteSelectedElementDirective, ElementResolverDirective, TabSelectionDirective, ToggleSelectionDirective } from "@shared-directives";

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

    constructor(private service: AbstractEditorElementActionsService<SectionPageElement>) {}

    public rootElements = toSignal(this.service.selectPageElements());

    public _trackById(_: number, item: number): number {
        return item;
    }
}
