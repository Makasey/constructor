import { AsyncPipe } from "@angular/common";
import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    OnInit,
    Signal,
    ViewEncapsulation,
    WritableSignal,
    computed,
    inject,
    signal,
} from "@angular/core";

import {
    AbstractEditorElementActionsService,
    EDITOR_SELECTED_ELEMENT,
    ELEMENT_ID,
    ElementActionType,
    ElementActionsConfigItem,
} from "@modules/constructor";

@Component({
    selector: "lz-element-actions",
    templateUrl: "./element-actions.component.html",
    styleUrl: "./element-actions.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [AsyncPipe],
})
export class ElementActionsComponent implements OnInit {
    @HostBinding("class.element-actions")
    public hostClass = true;

    public configItems: WritableSignal<ElementActionsConfigItem[]> = signal<ElementActionsConfigItem[]>([]);

    public showActions: Signal<boolean> = computed(() => this.selectedElement() === this.elementId);

    public readonly elementId: string = inject(ELEMENT_ID);

    public readonly selectedElement: Signal<string> = inject(EDITOR_SELECTED_ELEMENT);

    private readonly editorActionsService = inject(AbstractEditorElementActionsService);

    public ngOnInit(): void {
        this.configItems.set(this.editorActionsService.processElementActions(this.elementId));
    }

    public applyAction(action: ElementActionType): void {
        switch (action) {
            case ElementActionType.DUPLICATE: {
                this.editorActionsService.duplicateElementById(this.elementId);
                break;
            }
            case ElementActionType.DELETE: {
                this.editorActionsService.deleteElement(this.elementId);
                break;
            }
        }
    }
}
