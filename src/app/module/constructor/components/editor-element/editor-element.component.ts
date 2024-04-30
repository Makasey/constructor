import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject, HostBinding } from "@angular/core";

import { EDITOR_SELECTED_ELEMENT } from "@modules/constructor";
import { TabSelectionDirective, ToggleSelectionDirective } from "@shared-directives";

@Component({
    selector: "lz-editor-element",
    templateUrl: "./editor-element.component.html",
    styleUrl: "./editor-element.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    hostDirectives: [TabSelectionDirective, ToggleSelectionDirective, LZElementActionsComponent],
})
export class LZEditorElementComponent {
    @HostBinding('class.lz-editor-element')
    public readonly hostClass = true;

    public readonly selectedElement = inject(EDITOR_SELECTED_ELEMENT);
}