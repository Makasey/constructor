import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, HostBinding, OnInit, ViewEncapsulation, inject } from "@angular/core";

import {
    AbstractDragService,
    InnerPageElement,
    LZEditorElementComponent,
    processBackgroundValue,
    processSettingValueWithUnit,
} from "@modules/constructor";
import { BaseElementAbstract } from "@modules/constructor/components/elements/base-element/base-element.abstract";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { ElementResolverDirective, TabSelectionDirective, ToggleSelectionDirective } from "@shared-directives";
import { hostBinding } from "@modules/constructor/utils/host-binding";

@Component({
    selector: "lz-inner-element",
    templateUrl: "./inner.component.html",
    styleUrls: ["./inner.component.scss"],
    standalone: true,
    imports: [ElementResolverDirective, AsyncPipe, LZEditorElementComponent, DragDropModule],
    hostDirectives: [TabSelectionDirective, ToggleSelectionDirective],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InnerComponent extends BaseElementAbstract<InnerPageElement> implements OnInit {
    @HostBinding("class")
    public readonly classes = {
        "editor-element": true,
        "lz-inner-element": true,
    };

    public readonly connectedLists = inject(AbstractDragService).getConnectedDropListsId();

    public ngOnInit(): void {
        hostBinding(this.selectSlice("width", processSettingValueWithUnit), "style.width", this.injector);

        hostBinding(this.selectSlice("height", processSettingValueWithUnit), "style.min-height", this.injector);

        hostBinding(this.selectSlice("background", processBackgroundValue), "style.background", this.injector);

        hostBinding(this.selectSlice("justifyContent"), "style.justify-content", this.injector);
    }
}
