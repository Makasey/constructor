import { AbstractEditAreaService, ELEMENT_ID, SitePageElementSettings, processSettingValueWithUnit } from "@modules/constructor";
import { AsyncPipe, JsonPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, HostBinding, HostListener, OnInit, ViewEncapsulation, inject } from "@angular/core";
import { Observable, map } from "rxjs";

@Component({
    selector: "lz-title-element",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    templateUrl: "./title.components.html",
    styleUrls: ["./title.component.scss"],
    imports: [JsonPipe, AsyncPipe],
})
export class TitleComponent implements OnInit {
    private readonly service = inject(AbstractEditAreaService);

    @HostBinding("$.style.height")
    @HostListener("$.style.height")
    public titleHeight$: Observable<string>;

    @HostBinding("$.style.width")
    @HostListener("$.style.width")
    public titleWidth$: Observable<string>;

    private elementID = inject(ELEMENT_ID);

    public titleText$: Observable<string>;

    private titleSettings$: Observable<SitePageElementSettings>;

    public readonly titleElement$ = this.service.selectElement(this.elementID);

    public ngOnInit(): void {
        this.titleSettings$ = this.service.selectSettings(this.elementID);

        this.titleHeight$ = this.titleSettings$.pipe(map(settings => processSettingValueWithUnit(settings.height)));

        this.titleWidth$ = this.titleSettings$.pipe(map(settings => processSettingValueWithUnit(settings.width)));

        this.titleText$ = this.titleSettings$.pipe(map(settings => settings.text ?? ""));
    }
}
