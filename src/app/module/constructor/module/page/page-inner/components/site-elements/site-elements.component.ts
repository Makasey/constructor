import { CdkDrag, CdkDropList } from "@angular/cdk/drag-drop";
import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation, WritableSignal, computed, inject, signal } from "@angular/core";
import { NgClass } from "@angular/common";

import {
    AbstractEditorElementActionsService,
    EDITOR_SELECTED_ELEMENT,
    SitePageElementType,
    SitePageElementUnion,
    processPossibleElements,
} from "@modules/constructor";

@Component({
    selector: "lz-site-elements",
    templateUrl: "./site-elements.component.html",
    styleUrls: ["./site-elements.component.scss"],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [CdkDropList, CdkDrag, NgClass],
})
export class SiteElementsComponent {
    @HostBinding("class.lz-site-elements")
    public hostClass = true;

    private readonly service: AbstractEditorElementActionsService<SitePageElementUnion> = inject(AbstractEditorElementActionsService);

    public readonly selectedElement = inject(EDITOR_SELECTED_ELEMENT);

    public elements = computed(() => {
        const { type } = this.service.getElement(this.selectedElement());

        return processPossibleElements(type);
    });

    public currentDragElement: WritableSignal<SitePageElementType | null> = signal(null);

    public onDragStart(type: SitePageElementType): void {
        this.currentDragElement.set(type);
    }

    public onDragEnd(): void {
        this.currentDragElement.set(null);
    }
}
