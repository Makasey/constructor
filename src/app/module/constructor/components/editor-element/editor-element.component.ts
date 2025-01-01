import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, ViewEncapsulation, inject, input } from "@angular/core";

import { EDITOR_SELECTED_ELEMENT } from "@modules/constructor";
import { ElementResolverDirective, TabSelectionDirective, ToggleSelectionDirective } from "@shared-directives";
import { LZElementActionsComponent } from "../element-actions";

@Component({
    selector: "lz-editor-element",
    templateUrl: "./editor-element.component.html",
    styleUrl: "./editor-element.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [LZElementActionsComponent, ElementResolverDirective],
    hostDirectives: [TabSelectionDirective, ToggleSelectionDirective],
    standalone: true,
})
export class LZEditorElementComponent {
    @HostBinding("class.lz-editor-element")
    public readonly hostClass = true;

    public readonly elementId = input.required<string>();

    public readonly parentId = input.required<string>();

    public readonly element: ElementRef<HTMLElement> = inject(ElementRef<HTMLElement>);

    public readonly selectedElement = inject(EDITOR_SELECTED_ELEMENT);
}
