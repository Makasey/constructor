import { ChangeDetectionStrategy, Component, HostBinding, Injector, OnInit, Signal, ViewEncapsulation, inject } from "@angular/core";

import { toSignal } from "@angular/core/rxjs-interop";

import { AbstractEditorElementActionsService, SectionPageElement, SitePageElementUnion } from "@modules/constructor";

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
    private readonly injector = inject(Injector);

    public savedElements: Signal<SitePageElementUnion[] | undefined> = toSignal(this.editorActionsService.getSavedElements(), {
        injector: this.injector,
    });

    public autoSaveInLocaleStorage = toSignal(this.editorActionsService.autoSaveElementsInLocaleStorage(), { injector: this.injector });

    public ngOnInit(): void {
        this.editorActionsService.setSaveElements();
    }

    public addElement(elementId: string): void {
        this.editorActionsService.setSavedElementIntoEditor(elementId);
    }

    public deleteElement(elementId: string): void {
        this.editorActionsService.removeSavedElementById(elementId);
    }
}
