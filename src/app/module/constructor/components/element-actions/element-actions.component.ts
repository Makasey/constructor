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
    input,
    signal,
} from "@angular/core";

import {
    AbstractEditorElementActionsService,
    AbstractSaveEditorElementsService,
    EDITOR_SELECTED_ELEMENT,
    ElementActionType,
    ElementActionsConfigItem,
} from "@modules/constructor";

@Component({
    selector: "lz-element-actions",
    templateUrl: "./element-actions.component.html",
    styleUrl: "./element-actions.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [],
    standalone: true,
})
export class LZElementActionsComponent implements OnInit {
    @HostBinding("class.element-actions")
    public hostClass = true;

    public configItems: WritableSignal<ElementActionsConfigItem[]> = signal<ElementActionsConfigItem[]>([]);

    public showActions: Signal<boolean> = computed(() => this.selectedElement() === this.elementId());

    public readonly elementId = input.required<string>();

    public readonly selectedElement: Signal<string> = inject(EDITOR_SELECTED_ELEMENT);

    private readonly editorActionsService = inject(AbstractEditorElementActionsService);

    private readonly saveEditorElementsService = inject(AbstractSaveEditorElementsService);

    public ngOnInit(): void {
        this.configItems.set(this.editorActionsService.processElementActions(this.elementId()));
    }

    public applyAction(action: ElementActionType): void {
        switch (action) {
            case ElementActionType.DUPLICATE: {
                this.editorActionsService.duplicateElementById(this.elementId());
                break;
            }
            case ElementActionType.DELETE: {
                this.editorActionsService.deleteElement(this.elementId());
                break;
            }
            case ElementActionType.SAVE: {
                this.saveEditorElementsService.saveElement(this.elementId());
                break;
            }
        }
    }
}
