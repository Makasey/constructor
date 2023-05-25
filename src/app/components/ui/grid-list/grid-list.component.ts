import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, Renderer2, RendererStyleFlags2 } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LZGridItem, LZGridTemplatesMap, ViewModeTypes, columnsCountValiableName } from "./types";

@Component({
    selector: "lz-grid-list",
    templateUrl: "./grid-list.component.html",
    styleUrls: ["./grid-list.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule],
})
export class LZGridListComponent {
    @Input({ required: true })
    public items: LZGridItem[];

    @Input({ required: true })
    public itemTemplatesMap: LZGridTemplatesMap;

    @Input({ required: true })
    public viewMode: ViewModeTypes = ViewModeTypes.CARD;

    @Input({ required: true })
    public set columns(value: number) {
        this.renderer.setStyle(this.host.nativeElement, columnsCountValiableName, value, RendererStyleFlags2.DashCase);
    }

    @HostBinding("class.list-view")
    public get selectedView(): boolean {
        return this.viewMode === ViewModeTypes.LIST;
    }

    constructor(private renderer: Renderer2, private host: ElementRef<HTMLElement>) {}

    public _trackBy(index: number, item: LZGridItem): string | number {
        return item.id;
    }
}
