import { AbstractEditorElementActionsService, ELEMENT_ID, LZEditorElementComponent, SliderPageElement } from "@modules/constructor";
import { ChangeDetectionStrategy, Component, Signal, ViewEncapsulation, inject } from "@angular/core";
import { ElementResolverDirective } from "@shared-directives";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
    selector: "lz-slider-element",
    templateUrl: "./slider-element.component.html",
    styleUrl: "./slider-element.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ElementResolverDirective, LZEditorElementComponent],
    host: {
        class: "lz-slider-element",
    },
})
export class SliderElementComponent {
    public readonly ELEMENT_ID = inject(ELEMENT_ID);
    private readonly editorElementActionsService = inject(AbstractEditorElementActionsService);
    public readonly element: Signal<SliderPageElement> = toSignal(this.editorElementActionsService.selectElement(this.ELEMENT_ID));
}
