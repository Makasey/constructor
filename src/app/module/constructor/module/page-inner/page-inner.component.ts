import { APFormModel, APFormModule } from "@components/ui";
import {
    AbstractEditAreaService,
    EDITOR_SELECTED_ELEMENT,
    EditAreaComponent,
    ElementButton,
    SitePageElementType,
    blockElements,
} from "@modules/constructor";
import { ChangeDetectionStrategy, Component, HostBinding, Signal, ViewEncapsulation, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { map } from "rxjs";
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

    public elements: Signal<ElementButton[]> = toSignal(
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

    public readonly formModel = toSignal(this.service.selectFormModel(), {
        initialValue: {} as APFormModel,
    });

    public readonly elementSettingsFormModel = toSignal(this.service.selectElementSettingsFormModel(), {
        initialValue: {} as APFormModel,
    });

    public readonly formModelChanges = toSignal(this.service.selectFormModelChange());

    public readonly selectElementSettingsFormModelChange = toSignal(this.service.selectElementSettingsFormModelChange());

    @HostBinding("class.lz-page-inner")
    public hostClass = true;

    public createNewElement(type: SitePageElementType): void {
        this.service.addElement(type);
    }
}
