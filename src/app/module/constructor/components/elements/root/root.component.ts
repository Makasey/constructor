import { ChangeDetectionStrategy, Component, HostBinding, OnDestroy, OnInit, ViewEncapsulation, inject } from "@angular/core";
import { NgForOf } from "@angular/common";
import { toSignal } from "@angular/core/rxjs-interop";

import {
    AbstractDragService,
    AbstractEditorElementActionsService,
    AbstractSaveEditorElementsService,
    EDITOR_SELECTED_ELEMENT,
    LZEditorElementComponent,
} from "@modules/constructor";
import { CdkDropList } from "@angular/cdk/drag-drop";
import { DeleteSelectedElementDirective, ElementResolverDirective, TabSelectionDirective, ToggleSelectionDirective } from "@shared-directives";
import { LZEditorElementFlexComponent } from "@modules/constructor/components/editor-element/components/editor-element-flex/editor-element-flex.component";

@Component({
    selector: "lz-root-element",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ["./root.component.scss"],
    templateUrl: "./root.component.html",
    imports: [NgForOf, ElementResolverDirective, LZEditorElementComponent, LZEditorElementFlexComponent, CdkDropList],
    hostDirectives: [ToggleSelectionDirective, DeleteSelectedElementDirective, TabSelectionDirective],
})
export class RootComponent implements OnInit, OnDestroy {
    @HostBinding("class")
    public readonly hostClass = {
        "lz-root-element": true,
        "editor-element": true,
    };

    public readonly connectListsId = inject(AbstractDragService).getConnectedDropListsId();

    public console1 = console;

    private readonly service = inject(AbstractEditorElementActionsService);

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
