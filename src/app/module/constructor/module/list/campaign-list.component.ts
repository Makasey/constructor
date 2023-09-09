import { AbstractCampaignListService, DefaultCampaignListService } from "@modules/constructor/module/list/campaign-list.service";
import { AbstractModuleComponent } from "@core/abstract";
import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from "@angular/core";
import { LzTableModule } from "@components/ui";
import { NavigationLinkPipe } from "@shared-pipes/navigation-link/navigation-link.pipe";
import { RouteKey } from "@shared-types/routes/route-paths";
import { RouterLink } from "@angular/router";
import { untilDestroyed } from "@ngneat/until-destroy";

@Component({
    selector: "lz-campaign-list",
    standalone: true,
    templateUrl: "./campaign-list.component.html",
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ["./campaign-list.component.scss"],
    imports: [AsyncPipe, RouterLink, NavigationLinkPipe, LzTableModule],
    providers: [
        {
            provide: AbstractCampaignListService,
            useClass: DefaultCampaignListService,
        },
    ],
})
export class CampaignListComponent extends AbstractModuleComponent {
    @HostBinding("class.lz-campaign-list")
    public readonly hostClass = true;

    public readonly createNewCampaignLink = RouteKey.CAMPAIGN_EDITOR;

    public tableMeta$ = this.service.selectTableMeta();

    public selectedRows: string[] = [];

    public tableValues$ = this.service.selectTableValues();

    constructor(protected service: AbstractCampaignListService) {
        super(service);
    }

    public deleteCampaignByID(id: number): void {
        this.service.deleteCampaignByID(id).pipe(untilDestroyed(this)).subscribe();
    }

    public selectRows(rows: unknown[]): void {
        this.selectedRows = rows as string[];
    }
}
