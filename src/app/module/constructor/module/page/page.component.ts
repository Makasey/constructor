import { AbstractEditAreaService } from "@modules/constructor/components/edit-area/edit-area.service";
import { ActivatedRoute, RouterOutlet } from "@angular/router";
import { ChangeDetectionStrategy, Component, HostBinding, OnDestroy, OnInit, ViewEncapsulation, inject } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { filter, map } from "rxjs";
import { switchMap } from "rxjs/operators";

@UntilDestroy()
@Component({
    selector: "lz-page",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ["./page.component.scss"],
    standalone: true,
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
                map(params => params.id),
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
