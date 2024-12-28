import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, HostBinding, OnInit, ViewEncapsulation } from "@angular/core";
import { RouterLink } from "@angular/router";

import { untilDestroyed } from "@ngneat/until-destroy";

import { AbstractCampaignListService, DefaultCampaignListService } from "@modules/constructor";
import { AbstractModuleComponent } from "@core";

import { LZTableComponent } from "@components";

import { NavigationLinkPipe } from "@shared-pipes";
import { RouteKey } from "@shared-enums";

// import { provideWebsocket } from "@core";
// import { defaultWebsocketConfig } from "@core";

@Component({
    selector: "lz-campaign-list",
    templateUrl: "./campaign-list.component.html",
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ["./campaign-list.component.scss"],
    imports: [AsyncPipe, RouterLink, NavigationLinkPipe, LZTableComponent],
    providers: [
        {
            provide: AbstractCampaignListService,
            useClass: DefaultCampaignListService,
        },
        // ...provideWebsocket(defaultWebsocketConfig),
    ]
})
export class CampaignListComponent extends AbstractModuleComponent implements OnInit {
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

    public ngOnInit(options?: Record<string, unknown>): void {
        super.ngOnInit(options);

        // this.service.selectMessages("receive_message").subscribe(console.log);
    }

    public selectRows(rows: unknown[]): void {
        this.selectedRows = rows as string[];
    }

    // public test(): void {
    //     this.service.sendMessage("send_message", "TEST_MESSAGE");
    // }
}
