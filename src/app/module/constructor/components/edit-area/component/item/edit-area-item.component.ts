import { AbstractEditAreaService, EDITOR_SELECTED_ELEMENT, SitePageElement, SitePageElementType } from "@modules/constructor";
import { AsyncPipe, JsonPipe, NgForOf, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit, ViewEncapsulation, inject } from "@angular/core";
import { ElementResolverDirective } from "@shared-directives/element-resolver/element-resolver.directive";
import { ToggleSelectionDirective } from "@shared-directives/editor";

@Component({
    selector: "lz-edit-area-item",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    styleUrls: ["./edit-area-item.component.scss"],
    templateUrl: "./edit-area-item.component.html",
    hostDirectives: [ToggleSelectionDirective],
    imports: [AsyncPipe, JsonPipe, NgForOf, NgIf, ElementResolverDirective],
})
export class LZEditAreaItemComponent implements OnInit {
    @HostBinding("class")
    public hostClass = {
        "lz-edit-area-item": true,
        "editor-element": true,
    };

    @Input({ required: true })
    public elementID: number;

    @Input({ required: true })
    public parentID: number;

    public sitePageElementType = SitePageElementType;

    public element: SitePageElement | undefined;

    public readonly selectedElement$ = inject(EDITOR_SELECTED_ELEMENT);

    private readonly service = inject(AbstractEditAreaService);

    public ngOnInit(): void {
        this.element = this.service.getElement(this.elementID);
    }

    public deleteElement(): void {
        this.service.deleteElement(this.elementID);
    }
}
