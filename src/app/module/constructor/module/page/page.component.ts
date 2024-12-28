import { ActivatedRoute, RouterOutlet } from "@angular/router";
import { ChangeDetectionStrategy, Component, HostBinding, OnDestroy, OnInit, ViewEncapsulation, inject } from "@angular/core";

import { filter, map } from "rxjs";
import { switchMap } from "rxjs/operators";

import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

import { AbstractEditAreaService } from "@modules/constructor";

import { RouteParams } from "@shared-enums";

@UntilDestroy()
@Component({
    selector: "lz-page",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ["./page.component.scss"],
    templateUrl: "./page.component.html",
    imports: [RouterOutlet],
})
export class PageComponent implements OnInit, OnDestroy {
    @HostBinding("class.lz-page")
    public hostClass = true;

    private readonly service = inject(AbstractEditAreaService);

    private readonly activatedRoute = inject(ActivatedRoute);

    public ngOnInit(): void {
        this.activatedRoute.params
            .pipe(
                map(params => params[RouteParams.CAMPAIGN_ID]),
                filter(id => id && id !== "new"),
                switchMap((id: string) => {
                    return this.service.getCampaignById(+id);
                }),
                untilDestroyed(this),
            )
            .subscribe();
    }

    public ngOnDestroy(): void {
        this.service.resetState();
    }
}
