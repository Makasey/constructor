import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation, inject } from "@angular/core";
import { NgForOf } from "@angular/common";
import { toSignal } from "@angular/core/rxjs-interop";

import { AbstractEditorElementActionsService, SectionPageElement } from "@modules/constructor";
import { DeleteSelectedElementDirective, ElementResolverDirective, TabSelectionDirective, ToggleSelectionDirective } from "@shared-directives";
import { LZEditorElement } from "@modules/constructor/components/editor-element/editor-element.component";

@Component({
    selector: "lz-root-element",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ["./root.component.scss"],
    templateUrl: "./root.component.html",
    imports: [NgForOf, ElementResolverDirective, LZEditorElement],
    hostDirectives: [ToggleSelectionDirective, DeleteSelectedElementDirective, TabSelectionDirective],
})
export class RootComponent {
    @HostBinding("class")
    public readonly hostClass = {
        "lz-root-element": true,
        "editor-element": true,
    };

    private readonly service = inject(AbstractEditorElementActionsService<SectionPageElement>);

    public rootElements = toSignal(this.service.selectPageElements(), { initialValue: [] as string[] });
}
