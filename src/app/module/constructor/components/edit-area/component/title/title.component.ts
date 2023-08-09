import { AbstractEditAreaService } from "@modules/constructor/components/edit-area/edit-area.service";
import { AsyncPipe, JsonPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, HostBinding, HostListener, OnInit, ViewEncapsulation, inject } from "@angular/core";
import { ELEMENT_ID, processSettingValueWithUnit } from "@modules/constructor/components/edit-area/types";
import { Observable } from "rxjs";

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

    public readonly titleElement$ = this.service.selectElement(this.elementID);

    public ngOnInit(): void {
        this.titleHeight$ = this.service.selectSettings(this.elementID, settings => processSettingValueWithUnit(settings.height));

        this.titleWidth$ = this.service.selectSettings(this.elementID, settings => processSettingValueWithUnit(settings.width));

        this.titleText$ = this.service.selectSettings(this.elementID, settings => settings.text ?? "");
    }
}
