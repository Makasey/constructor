import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, HostListener, ViewEncapsulation, inject, input } from "@angular/core";

import { AbstractEditorElementActionsService, EDITOR_SELECTED_ELEMENT, ElementButton } from "@modules/constructor";
import { DroppableDirective, TabSelectionDirective, ToggleSelectionDirective } from "@shared-directives";
import { LZDropEvent } from "@shared-directives/drag-and-drop/types";
import { LZElementActionsComponent } from "../element-actions";

@Component({
    selector: "lz-editor-element",
    templateUrl: "./editor-element.component.html",
    styleUrl: "./editor-element.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [LZElementActionsComponent],
    hostDirectives: [
        TabSelectionDirective,
        ToggleSelectionDirective,
        {
            directive: DroppableDirective,
            outputs: ["itemDropped"],
            inputs: ["id:elementId"],
        },
    ],
})
export class LZEditorElementComponent {
    @HostBinding("class.lz-editor-element")
    public readonly hostClass = true;

    public readonly elementId = input.required<string>();

    public readonly element: ElementRef<HTMLElement> = inject(ElementRef);

    public readonly selectedElement = inject(EDITOR_SELECTED_ELEMENT);

    private readonly service = inject(AbstractEditorElementActionsService);

    @HostListener("itemDropped", ["$event"])
    public onItemDropped({ id, data }: LZDropEvent<string, ElementButton>): void {
        const { type } = data;
        this.service.addElementByType(type, id);
    }
}
