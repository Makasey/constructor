import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation, inject } from "@angular/core";
import { NgClass, NgForOf, NgIf } from "@angular/common";

import { map } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";

import {
    AbstractEditorElementActionsService,
    EDITOR_SELECTED_ELEMENT,
    ROOT_ELEMENT_ID,
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
    imports: [NgClass, NgForOf, NgIf],
})
export class SiteElementsComponent {
    @HostBinding("class.lz-site-elements")
    public hostClass = true;

    private readonly service: AbstractEditorElementActionsService<SitePageElementUnion> = inject(AbstractEditorElementActionsService);

    public readonly selectedElement$ = inject(EDITOR_SELECTED_ELEMENT);

    public readonly selectedElement = toSignal(this.selectedElement$);

    public elements = toSignal(
        this.selectedElement$.pipe(
            map(selectedElement => {
                const { type } = this.service.getElement(selectedElement);

                return processPossibleElements(type);
            }),
        ),
        { initialValue: [] },
    );

    public createNewElement(type: SitePageElementType): void {
        if (this.selectedElement() === ROOT_ELEMENT_ID) {
            this.service.addPageElement(type);

            return;
        }

        this.service.addElementByType(type);
    }
}
