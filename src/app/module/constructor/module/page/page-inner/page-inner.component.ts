import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation, inject } from "@angular/core";
import { CommonModule } from "@angular/common";

import { toSignal } from "@angular/core/rxjs-interop";

import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

import { APFormModule, LzTabsComponent, TabsItemComponent } from "@components";
import {
    AbstractCampaignService,
    EditAreaComponent,
    ElementSettingsComponent,
    SiteElementsComponent,
    SiteSettingsComponent,
} from "@modules/constructor";

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

    private readonly service = inject(AbstractCampaignService);

    public readonly isNewCampaign = toSignal(this.service.selectIsNewCampaign());

    public createCampaign(): void {
        this.service.createCampaign().pipe(untilDestroyed(this)).subscribe();
    }

    public updateCampaign(): void {
        this.service.updateCampaignById().pipe(untilDestroyed(this)).subscribe();
    }
}
