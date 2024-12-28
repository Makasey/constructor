import { ChangeDetectionStrategy, Component, HostBinding, HostListener, OnDestroy, OnInit, ViewEncapsulation, inject } from "@angular/core";

import { toSignal } from "@angular/core/rxjs-interop";

import {
    AbstractEditorElementActionsService,
    AbstractSaveEditorElementsService,
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
    encapsulation: ViewEncapsulation.None,
    styleUrls: ["./root.component.scss"],
    templateUrl: "./root.component.html",
    imports: [ElementResolverDirective, LZEditorElementComponent, DroppableDirective],
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
export class RootComponent implements OnInit, OnDestroy {
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

    private readonly saveEditorElementsService = inject(AbstractSaveEditorElementsService);

    public readonly selectedElement = inject(EDITOR_SELECTED_ELEMENT);

    public rootElements = toSignal(this.service.selectPageElements(), { initialValue: [] as string[] });

    public readonly autoSaveInLocaleStorage = toSignal(this.saveEditorElementsService.autoSaveElementsInLocaleStorage());

    public ngOnInit(): void {
        this.autoSaveInLocaleStorage();
    }

    public ngOnDestroy(): void {
        this.saveEditorElementsService.clearSaveElements();
    }
}
