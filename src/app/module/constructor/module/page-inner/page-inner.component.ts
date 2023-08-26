import { APFormModel, APFormModule } from "@components/ui";
import { AbstractEditAreaService } from "@modules/constructor/components/edit-area/edit-area.service";
import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EDITOR_SELECTED_ELEMENT } from "@modules/constructor/providers/selected-element.provider";
import { EditAreaComponent } from "@modules/constructor/components/edit-area/edit-area.component";
import { SitePageElementType } from "@modules/constructor/components/edit-area/types";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { blockElements } from "@modules/constructor/module/page-inner/types";
import { map } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";

@UntilDestroy()
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
    @HostBinding("class.lz-page-inner")
    public hostClass = true;

    private readonly service = inject(AbstractEditAreaService);

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

    public readonly formModel = toSignal(this.service.selectFormModel(), {
        initialValue: {} as APFormModel,
    });

    public readonly isNewCampaign = toSignal(this.service.selectIsNewCampaign());

    public readonly elementSettingsFormModel = toSignal(this.service.selectElementSettingsFormModel(), {
        initialValue: {} as APFormModel,
    });

    public readonly formModelChanges = toSignal(this.service.selectFormModelChange());

    public readonly selectElementSettingsFormModelChange = toSignal(this.service.selectElementSettingsFormModelChange());

    public createNewElement(type: SitePageElementType): void {
        this.service.addElement(type);
    }

    public createCampaign(): void {
        this.service.createCampaign().pipe(untilDestroyed(this)).subscribe();
    }

    public updateCampaign(): void {
        this.service.updateCampaignById().pipe(untilDestroyed(this)).subscribe();
    }
}
