import { ChangeDetectionStrategy, Component, HostBinding, OnInit, Signal, ViewEncapsulation, inject } from "@angular/core";

import { toSignal } from "@angular/core/rxjs-interop";

import { AbstractSaveEditorElementsService, SitePageElementUnion } from "@modules/constructor";

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

    private readonly saveEditorElementsService = inject(AbstractSaveEditorElementsService);

    public savedElements: Signal<SitePageElementUnion[] | undefined> = toSignal(this.saveEditorElementsService.getSavedElements());

    public ngOnInit(): void {
        this.saveEditorElementsService.setSaveElementsToState();
    }

    public addElement(elementId: string): void {
        this.saveEditorElementsService.setSavedElementIntoEditor(elementId);
    }

    public deleteElement(elementId: string): void {
        this.saveEditorElementsService.removeSavedElementById(elementId);
    }
}
