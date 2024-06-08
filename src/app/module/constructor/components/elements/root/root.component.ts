import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation, inject } from "@angular/core";
import { NgForOf } from "@angular/common";
import { toSignal } from "@angular/core/rxjs-interop";

import { AbstractEditorElementActionsService, LZEditorElementComponent, SectionPageElement } from "@modules/constructor";
import { DeleteSelectedElementDirective, ElementResolverDirective, TabSelectionDirective, ToggleSelectionDirective } from "@shared-directives";
import { DroppableDirective } from "@shared-directives/drag-and-drop";

@Component({
    selector: "lz-root-element",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ["./root.component.scss"],
    templateUrl: "./root.component.html",
    imports: [NgForOf, ElementResolverDirective, LZEditorElementComponent, DroppableDirective],
    hostDirectives: [
        ToggleSelectionDirective,
        DeleteSelectedElementDirective,
        TabSelectionDirective,
        {
            directive: DroppableDirective,
            inputs: ["lzDroppable"],
        },
    ],
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
