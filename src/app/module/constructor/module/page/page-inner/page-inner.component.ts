import { ChangeDetectionStrategy, Component, HostBinding, OnInit, ViewEncapsulation, inject } from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";

import { toSignal } from "@angular/core/rxjs-interop";

import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

import { APFormModule, LzTabsComponent, TabsItemComponent } from "@components";
import {
    AbstractCampaignService,
    EditAreaComponent,
    ElementSettingsComponent,
    PageElementsTreeComponent,
    SiteElementsComponent,
    SiteSettingsComponent,
} from "@modules/constructor";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { NavigationLinkPipe } from "@shared-pipes";
import { RouteKey, RouteParams } from "@shared-types";

@UntilDestroy()
@Component({
    selector: "lz-page-inner",
    templateUrl: "./page-inner.component.html",
    styleUrls: ["./page-inner.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        EditAreaComponent,
        APFormModule,
        LzTabsComponent,
        TabsItemComponent,
        SiteElementsComponent,
        ElementSettingsComponent,
        SiteSettingsComponent,
        RouterLink,
        NavigationLinkPipe,
        NgTemplateOutlet,
        PageElementsTreeComponent,
    ],
})
export class PageInnerComponent implements OnInit {
    @HostBinding("class.lz-page-inner")
    public hostClass = true;

    private readonly service = inject(AbstractCampaignService);

    private readonly activatedRoute = inject(ActivatedRoute);

    public readonly previewPath = RouteKey.CAMPAIGN_PREVIEW;

    public campaignId: string;

    public readonly isNewCampaign = toSignal(this.service.selectIsNewCampaign());

    public ngOnInit(): void {
        this.campaignId = this.activatedRoute.snapshot.paramMap.get(RouteParams.CAMPAIGN_ID) ?? "new";
    }

    public createCampaign(): void {
        this.service.createCampaign().pipe(untilDestroyed(this)).subscribe();
    }

    public updateCampaign(): void {
        this.service.updateCampaignById().pipe(untilDestroyed(this)).subscribe();
    }
}
