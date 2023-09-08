import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from "@angular/core";
import { NgClass, NgForOf, NgIf } from "@angular/common";

import { map } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";

import { AbstractEditorElementActionsService } from "@modules/constructor/core/abstract/editor-element.service";
import { EDITOR_SELECTED_ELEMENT } from "@modules/constructor/providers/selected-element.provider";
import { SitePageElementType, SitePageElementUnion } from "@modules/constructor/components/edit-area/types";
import { blockElements } from "@modules/constructor/module/page-inner/types";

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
    private readonly service: AbstractEditorElementActionsService<SitePageElementUnion> = inject(AbstractEditorElementActionsService);

    public readonly selectedElement$ = inject(EDITOR_SELECTED_ELEMENT);

    public elements = toSignal(
        this.selectedElement$.pipe(
            map(selectedElement => {
                const { type } = this.service.getElement(selectedElement);

                if (type === SitePageElementType.PAGE) {
                    return [
                        {
                            title: "Секция",
                            type: SitePageElementType.SECTION,
                            icon: "bx-font",
                        },
                    ];
                }

                if (blockElements.includes(type)) {
                    return [
                        {
                            title: "Заголовок",
                            type: SitePageElementType.TITLE,
                            icon: "bx-font",
                        },
                        {
                            title: "Заголовок",
                            type: SitePageElementType.TITLE,
                            icon: "bx-font",
                        },
                        {
                            title: "Секция",
                            type: SitePageElementType.SECTION,
                            icon: "bx-font",
                        },
                    ];
                }

                return [];
            }),
        ),
        { initialValue: [] },
    );

    public createNewElement(type: SitePageElementType): void {
        this.service.addElement(type);
    }
}
