import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation, WritableSignal, inject, signal } from "@angular/core";

import { AbstractEditorElementActionsService, SectionPageElement, SitePageElementUnion } from "@modules/constructor";
import { LocalStorageService } from "@modules/constructor/core";

@Component({
    selector: "lz-saved-elements",
    templateUrl: "./saved-elements.component.html",
    styleUrl: "./saved-elements.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [],
})
export class SavedElementsComponent {
    @HostBinding("class.saved-elements")
    public hostClass = true;

    private readonly editorActionsService = inject(AbstractEditorElementActionsService<SectionPageElement>);
    private readonly localStorageService = inject(LocalStorageService);

    public savedElements: WritableSignal<SitePageElementUnion[]> = signal(this.editorActionsService.getItems());

    public deleteElement(elementId: string): void {
        const elements = this.savedElements().filter(el => el.id !== elementId);

        this.editorActionsService.setItems(elements);
    }

    public addElement(elementId: string): void {
        return;
    }
}
