import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Observable } from "rxjs";

import { AbstractEditorElementActionsService, ELEMENT_ID, TabsItemPageElement } from "@modules/constructor";
import { ElementResolverDirective, TabSelectionDirective, ToggleSelectionDirective } from "@shared-directives";

@Component({
    selector: "lz-tab-element-item",
    standalone: true,
    imports: [CommonModule, ElementResolverDirective],
    templateUrl: "./tab-element-item.component.html",
    styleUrls: ["./tab-element-item.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    hostDirectives: [TabSelectionDirective, ToggleSelectionDirective],
})
export class TabElementItemComponent {
    public readonly ELEMENT_ID = inject(ELEMENT_ID);

    private readonly editorElementActionsService = inject(AbstractEditorElementActionsService);

    public element$: Observable<TabsItemPageElement> = this.editorElementActionsService.selectElement(this.ELEMENT_ID);

    public _trackBy(_: number, item: string): string {
        return item;
    }
}
