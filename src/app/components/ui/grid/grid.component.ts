import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnInit,
    Renderer2,
    RendererStyleFlags2,
    TemplateRef,
    computed,
    input,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { LZGridItem, LZGridTemplateData, ViewModeTypes, columnsCountVariableName } from "@components";
import { hostBinding } from "@modules/constructor/utils/host-binding";

@Component({
    selector: "lz-grid",
    templateUrl: "./grid.component.html",
    styleUrls: ["./grid.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule],
    host: {
        class: "lz-grid",
    },
})
export class LZGridListComponent implements OnInit {
    public readonly items = input.required<LZGridItem[]>();

    @Input({ required: true })
    public set columns(value: number) {
        this.renderer.setStyle(this.host.nativeElement, columnsCountVariableName, value, RendererStyleFlags2.DashCase);
    }

    public ngOnInit(): void {
        hostBinding(
            computed(() => this.viewMode() === ViewModeTypes.LIST),
            "class.list-view",
        );
    }

    public readonly itemTemplate = input<TemplateRef<LZGridTemplateData>>();

    public readonly viewMode = input<ViewModeTypes>(ViewModeTypes.CARD);

    constructor(
        private renderer: Renderer2,
        private host: ElementRef<HTMLElement>,
    ) {}
}
