import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation, inject } from "@angular/core";
import { CommonModule } from "@angular/common";

import { toSignal } from "@angular/core/rxjs-interop";

import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

import { APFormModule } from "@components/ui";
import { AbstractEditAreaService } from "@modules/constructor/components/edit-area/edit-area.service";
import { EditAreaComponent } from "@modules/constructor/components/edit-area/edit-area.component";
import { ElementSettingsComponent } from "@modules/constructor/module/page-inner/components/element-settings/element-settings.component";
import { LzTabsComponent } from "@components/ui/tabs";
import { SiteElementsComponent } from "@modules/constructor/module/page-inner/components/site-elements/site-elements.component";
import { SiteSettingsComponent } from "@modules/constructor/module/page-inner/components/site-settings/site-settings.component";
import { TabsItemComponent } from "@components/ui/tabs/components/tabs-item/tabs-item.component";

@UntilDestroy()
@Component({
    selector: "lz-page-inner",
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    imports: [
        CommonModule,
        EditAreaComponent,
        APFormModule,
        LzTabsComponent,
        TabsItemComponent,
        SiteElementsComponent,
        ElementSettingsComponent,
        SiteSettingsComponent,
    ],
    templateUrl: "./page-inner.component.html",
    styleUrls: ["./page-inner.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageInnerComponent {
    @HostBinding("class.lz-page-inner")
    public hostClass = true;

    private readonly service = inject(AbstractEditAreaService);

    public readonly isNewCampaign = toSignal(this.service.selectIsNewCampaign());

    public createCampaign(): void {
        this.service.createCampaign().pipe(untilDestroyed(this)).subscribe();
    }

    public updateCampaign(): void {
        this.service.updateCampaignById().pipe(untilDestroyed(this)).subscribe();
    }
}
