import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, Renderer2, RendererStyleFlags2, TemplateRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LZGridItem, LZGridTemplateData, ViewModeTypes, columnsCountVariableName } from "./types";

@Component({
    selector: "lz-grid",
    templateUrl: "./grid.component.html",
    styleUrls: ["./grid.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule],
})
export class LZGridListComponent {
    @HostBinding("class.list-view")
    public get selectedView(): boolean {
        return this.viewMode === ViewModeTypes.LIST;
    }

    @HostBinding("class.lz-grid")
    public hostClass = true;

    @Input({ required: true })
    public items: unknown[];

    @Input({ required: true })
    public set columns(value: number) {
        this.renderer.setStyle(this.host.nativeElement, columnsCountVariableName, value, RendererStyleFlags2.DashCase);
    }

    @Input()
    public itemTemplate: TemplateRef<LZGridTemplateData>;

    @Input()
    public viewMode: ViewModeTypes = ViewModeTypes.CARD;

    constructor(private renderer: Renderer2, private host: ElementRef<HTMLElement>) {}

    public _trackBy(index: number, item: LZGridItem): string | number {
        return item.id;
    }
}
