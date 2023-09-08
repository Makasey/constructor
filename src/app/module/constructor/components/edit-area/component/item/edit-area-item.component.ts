import { AbstractEditorElementActionsService } from "@modules/constructor/core/abstract/editor-element.service";
import { AsyncPipe, JsonPipe, NgForOf, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit, ViewEncapsulation, inject } from "@angular/core";
import { EDITOR_SELECTED_ELEMENT } from "@modules/constructor/providers/selected-element.provider";
import { ElementResolverDirective } from "@shared-directives/element-resolver/element-resolver.directive";
import { SitePageElement, SitePageElementType } from "@modules/constructor/components/edit-area/types";

@Component({
    selector: "lz-edit-area-item",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    styleUrls: ["./edit-area-item.component.scss"],
    templateUrl: "./edit-area-item.component.html",
    imports: [AsyncPipe, JsonPipe, NgForOf, NgIf, ElementResolverDirective],
})
export class LZEditAreaItemComponent implements OnInit {
    @HostBinding("class.lz-edit-area-item")
    public hostClass = true;

    @Input({ required: true })
    public elementID: number;

    @Input({ required: true })
    public parentID: number;

    public sitePageElementType = SitePageElementType;

    public element: SitePageElement | undefined;

    public readonly selectedElement$ = inject(EDITOR_SELECTED_ELEMENT);

    private readonly service = inject(AbstractEditorElementActionsService);

    public ngOnInit(): void {
        this.element = this.service.getElement(this.elementID);
    }

    public deleteElement(): void {
        this.service.deleteElement(this.elementID);
    }

    public addElement(type: SitePageElementType): void {
        this.service.addElement(type, this.parentID);
    }
}
