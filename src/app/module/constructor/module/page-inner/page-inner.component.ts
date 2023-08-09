import { APFormModel, APFormModule } from "@components/ui";
import { AbstractEditAreaService } from "@modules/constructor/components/edit-area/edit-area.service";
import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EDITOR_SELECTED_ELEMENT } from "@modules/constructor/providers/selected-element.provider";
import { EditAreaComponent } from "@modules/constructor/components/edit-area/edit-area.component";
import { ElementButton, blockElements } from "@modules/constructor/module/page-inner/types";
import { Observable, map } from "rxjs";
import { SitePageElementType } from "@modules/constructor/components/edit-area/types";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
    selector: "lz-page-inner",
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    imports: [CommonModule, EditAreaComponent, APFormModule],
    templateUrl: "./page-inner.component.html",
    styleUrls: ["./page-inner.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageInnerComponent {
    private readonly service = inject(AbstractEditAreaService);

    public readonly selectedElement$ = inject(EDITOR_SELECTED_ELEMENT);

    public elements$: Observable<ElementButton[]> = this.selectedElement$.pipe(
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
    );

    public readonly formModel = toSignal(this.service.selectFormModel(), {
        initialValue: {} as APFormModel,
    });

    public readonly formModelChanges = toSignal(this.service.selectFormModelChange());

    @HostBinding("class.lz-page-inner")
    public hostClass = true;

    public createNewElement(type: SitePageElementType): void {
        this.service.addElement(type);
    }
}
