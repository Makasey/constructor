import { AbstractEditorElementActionsService, EDITOR_SELECTED_ELEMENT } from "@modules/constructor";
import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input, inject } from "@angular/core";

@Component({
    selector: "lz-duplicate-element",
    templateUrl: "./duplicate-element.component.html",
    styleUrl: "./duplicate-element.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [AsyncPipe],
})
export class DuplicateElementComponent {
    @Input({ required: true }) public elementId: string;

    public readonly selectedElement$ = inject(EDITOR_SELECTED_ELEMENT);

    private readonly editorActionsService = inject(AbstractEditorElementActionsService);

    public duplicate(): void {
        this.editorActionsService.duplicateElementById(this.elementId);
    }
}
