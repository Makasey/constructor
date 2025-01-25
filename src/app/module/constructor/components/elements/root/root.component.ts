import { ChangeDetectionStrategy, Component, HostBinding, OnDestroy, OnInit, ViewEncapsulation, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";

import {
    AbstractDragService,
    AbstractEditorElementActionsService,
    AbstractSaveEditorElementsService,
    EDITOR_SELECTED_ELEMENT,
    EDITOR_SELECTED_PAGE,
    LZEditorElementComponent,
} from "@modules/constructor";
import { CdkDrag, CdkDropList } from "@angular/cdk/drag-drop";
import { DeleteSelectedElementDirective, ElementResolverDirective, TabSelectionDirective, ToggleSelectionDirective } from "@shared-directives";
import { LZEditorElementFlexComponent } from "@modules/constructor/components/editor-element/components/editor-element-flex/editor-element-flex.component";

@Component({
    selector: "lz-root-element",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ["./root.component.scss"],
    templateUrl: "./root.component.html",
    imports: [LZEditorElementFlexComponent, CdkDrag, ElementResolverDirective, CdkDropList, LZEditorElementComponent],
    hostDirectives: [ToggleSelectionDirective, DeleteSelectedElementDirective, TabSelectionDirective],
})
export class RootComponent implements OnInit, OnDestroy {
    @HostBinding("class")
    public readonly hostClass = {
        "lz-root-element": true,
        "editor-element": true,
    };

    public readonly connectListsId = inject(AbstractDragService).getConnectedDropListsId();

    private readonly service = inject(AbstractEditorElementActionsService);

    private readonly saveEditorElementsService = inject(AbstractSaveEditorElementsService);

    public readonly autoSaveInLocaleStorage = toSignal(this.saveEditorElementsService.autoSaveElementsInLocaleStorage());

    public readonly selectedElement = inject(EDITOR_SELECTED_ELEMENT);

    public readonly selectedPage = inject(EDITOR_SELECTED_PAGE);

    public rootElements = toSignal(this.service.selectPageElements(), { initialValue: [] as string[] });

    public ngOnInit(): void {
        this.autoSaveInLocaleStorage();
    }

    public ngOnDestroy(): void {
        this.saveEditorElementsService.clearSaveElements();
    }

    public trackByChild(_: number, item: string): string {
        return item;
    }
}
