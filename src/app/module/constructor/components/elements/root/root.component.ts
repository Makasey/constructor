import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";

import { AbstractSaveEditorElementsService, EDITOR_SELECTED_ELEMENT, EDITOR_SELECTED_PAGE } from "@modules/constructor";
import { DeleteSelectedElementDirective, TabSelectionDirective, ToggleSelectionDirective } from "@shared-directives";
import { LZEditorElementFlexComponent } from "@modules/constructor/components/editor-element/components/editor-element-flex/editor-element-flex.component";

@Component({
    selector: "lz-root-element",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ["./root.component.scss"],
    templateUrl: "./root.component.html",
    imports: [LZEditorElementFlexComponent],
    hostDirectives: [ToggleSelectionDirective, DeleteSelectedElementDirective, TabSelectionDirective],
    host: {
        "[class.lz-root-element]": "true",
        "[class.editor-element]": "true",
    },
})
export class RootComponent implements OnInit, OnDestroy {
    private readonly saveEditorElementsService = inject(AbstractSaveEditorElementsService);
    public readonly autoSaveInLocaleStorage = toSignal(this.saveEditorElementsService.autoSaveElementsInLocaleStorage());
    public readonly selectedElement = inject(EDITOR_SELECTED_ELEMENT);
    public readonly selectedPage = inject(EDITOR_SELECTED_PAGE);

    public ngOnInit(): void {
        this.autoSaveInLocaleStorage();
    }

    public ngOnDestroy(): void {
        this.saveEditorElementsService.clearSaveElements();
    }
}
