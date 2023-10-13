import { APDropdownFieldModule, LZLoaderComponent } from "@components";
import { AbstractCampaignService, AbstractPreviewService, CampaignPreviewModel } from "@modules/constructor";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { AsyncPipe, NgIf } from "@angular/common";
import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    Injector,
    OnInit,
    Signal,
    ViewEncapsulation,
    WritableSignal,
    inject,
    signal,
} from "@angular/core";
import { CreatePreviewDirective } from "@shared-directives";
import { FormsModule } from "@angular/forms";
import { NavigationLinkPipe } from "@shared-pipes";
import { Observable, delay, tap } from "rxjs";
import { RouteKey, RouteParams } from "@shared-types";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { toSignal } from "@angular/core/rxjs-interop";

@UntilDestroy()
@Component({
    selector: "lz-site-preview",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    styleUrls: ["./preview.component.scss"],
    templateUrl: "./preview.component.html",
    imports: [AsyncPipe, APDropdownFieldModule, FormsModule, RouterLink, NavigationLinkPipe, CreatePreviewDirective, NgIf, LZLoaderComponent],
})
export class LZSitePreviewComponent implements OnInit {
    @HostBinding("class.lz-site-preview")
    public hostClass = true;

    private readonly previewService = inject(AbstractPreviewService);

    private readonly campaignService = inject(AbstractCampaignService);

    private readonly activatedRoute = inject(ActivatedRoute);

    private readonly injector = inject(Injector);

    public campaignId: string;

    public readonly editorPath = RouteKey.CAMPAIGN_EDITOR;

    public previewData: Signal<CampaignPreviewModel[] | null>;

    public selectedPage: WritableSignal<CampaignPreviewModel | null> = signal(null);

    public ngOnInit(): void {
        this.campaignId = this.activatedRoute.snapshot.paramMap.get(RouteParams.CAMPAIGN_ID) ?? "new";

        this.previewData = toSignal(
            this.getPostPreview().pipe(
                tap(pages => {
                    this.selectedPage.set(pages[0] ?? null);
                }),
            ),
            { injector: this.injector, initialValue: null },
        );
    }

    public updateSelectedPage(id: string): void {
        const selectedPage = this.previewData()!.find(page => page.id === id) ?? null;

        this.selectedPage.set(selectedPage);
    }

    public createCampaign(): void {
        this.campaignService.createCampaign().pipe(untilDestroyed(this)).subscribe();
    }

    private getPostPreview(): Observable<CampaignPreviewModel[]> {
        return this.previewService.postPreview().pipe(delay(2000));
    }
}
