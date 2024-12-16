import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, ViewEncapsulation, inject, input } from "@angular/core";

import { EDITOR_SELECTED_ELEMENT } from "@modules/constructor";
import { LZElementActionsComponent } from "../element-actions";
import { TabSelectionDirective, ToggleSelectionDirective } from "@shared-directives";

@Component({
    selector: "lz-editor-element",
    templateUrl: "./editor-element.component.html",
    styleUrl: "./editor-element.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [LZElementActionsComponent],
    hostDirectives: [TabSelectionDirective, ToggleSelectionDirective],
})
export class LZEditorElementComponent {
    @HostBinding("class.lz-editor-element")
    public readonly hostClass = true;

    public readonly elementId = input.required<string>();

    public readonly element: ElementRef<HTMLElement> = inject(ElementRef);

    public readonly selectedElement = inject(EDITOR_SELECTED_ELEMENT);
}
