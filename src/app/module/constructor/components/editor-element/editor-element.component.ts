import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation, inject, input } from "@angular/core";

import { EDITOR_SELECTED_ELEMENT, LZElementActionsComponent } from "@modules/constructor";
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

    public readonly selectedElement = inject(EDITOR_SELECTED_ELEMENT);
}
