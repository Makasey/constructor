import { ChangeDetectionStrategy, Component, inject, signal } from "@angular/core";

import { AbstractEditorElementActionsService, SectionPageElement } from "@modules/constructor";
import { LocalStorageService } from "@modules/constructor/core";

@Component({
    selector: "lz-saved-elements",
    templateUrl: "./saved-elements.component.html",
    styleUrl: "./saved-elements.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [],
})
export class SavedElementsComponent {
    private readonly editorActionsService = inject(AbstractEditorElementActionsService<SectionPageElement>);
    private readonly localStorageService = inject(LocalStorageService);

    public savedElements = signal(JSON.parse(this.localStorageService.getItem("sections")!) || []);
}
