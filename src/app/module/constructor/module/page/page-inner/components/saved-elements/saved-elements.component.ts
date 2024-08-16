import { ChangeDetectionStrategy, Component, HostBinding, OnInit, Signal, ViewEncapsulation, inject } from "@angular/core";

import { AbstractEditorElementActionsService, SectionPageElement, SitePageElementUnion } from "@modules/constructor";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
    selector: "lz-saved-elements",
    templateUrl: "./saved-elements.component.html",
    styleUrl: "./saved-elements.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [],
})
export class SavedElementsComponent implements OnInit {
    @HostBinding("class.saved-elements")
    public hostClass = true;

    private readonly editorActionsService = inject(AbstractEditorElementActionsService<SectionPageElement>);

    public savedElements: Signal<SitePageElementUnion[] | undefined> = toSignal(this.editorActionsService.getSavedElements());

    public ngOnInit(): void {
        this.editorActionsService.setSaveElements();
    }

    public deleteElement(elementId: string): void {
        this.editorActionsService.removeSavedElementById(elementId);
    }

    public addElement(elementId: string): void {
        this.editorActionsService.setSavedElementIntoEditor(elementId);
    }
}
