import { AbstractEditorElementActionsService, ELEMENT_ID, LZEditorElementComponent, SliderItemPageElement } from "@modules/constructor";
import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, Signal, ViewEncapsulation, inject } from "@angular/core";
import { ElementResolverDirective, TabSelectionDirective, ToggleSelectionDirective } from "@shared-directives";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
    selector: "lz-slider-element-item",
    templateUrl: "./slider-element-item.component.html",
    styleUrl: "./slider-element-item.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    hostDirectives: [TabSelectionDirective, ToggleSelectionDirective],
    standalone: true,
    host: {
        class: "lz-slider-element-item",
    },
    imports: [AsyncPipe, LZEditorElementComponent, ElementResolverDirective],
})
export class SliderElementItemComponent {
    public readonly ELEMENT_ID = inject(ELEMENT_ID);
    private readonly editorElementActionsService = inject(AbstractEditorElementActionsService);
    public readonly element: Signal<SliderItemPageElement> = toSignal(this.editorElementActionsService.selectElement(this.ELEMENT_ID));
}
