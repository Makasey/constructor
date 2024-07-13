import { ChangeDetectionStrategy, Component, HostBinding, HostListener, ViewEncapsulation, inject } from "@angular/core";
import { NgForOf } from "@angular/common";
import { toSignal } from "@angular/core/rxjs-interop";

import {
    AbstractEditorElementActionsService,
    EDITOR_SELECTED_ELEMENT,
    ElementButton,
    LZEditorElementComponent,
    ROOT_ELEMENT_ID,
    SectionPageElement,
} from "@modules/constructor";
import { DeleteSelectedElementDirective, ElementResolverDirective, TabSelectionDirective, ToggleSelectionDirective } from "@shared-directives";
import { DroppableDirective } from "@shared-directives/drag-and-drop";
import { LZDropEvent } from "@shared-directives/drag-and-drop/types";

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
            outputs: ["itemDropped"],
        },
    ],
})
export class RootComponent {
    @HostBinding("class")
    public readonly hostClass = {
        "lz-root-element": true,
        "editor-element": true,
    };

    @HostListener("itemDropped", ["$event"])
    public createNewElement(event: LZDropEvent<string, ElementButton>): void {
        const { type } = event.data;
        if (this.selectedElement() === ROOT_ELEMENT_ID) {
            this.service.addPageElement(type);

            return;
        }

        this.service.addElementByType(type);
    }

    private readonly service = inject(AbstractEditorElementActionsService<SectionPageElement>);

    public readonly selectedElement = inject(EDITOR_SELECTED_ELEMENT);

    public rootElements = toSignal(this.service.selectPageElements(), { initialValue: [] as string[] });
}
