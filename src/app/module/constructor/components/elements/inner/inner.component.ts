import { ChangeDetectionStrategy, Component, HostBinding, OnInit, ViewEncapsulation } from "@angular/core";

import { BaseElementAbstract } from "@modules/constructor/components/elements/base-element/base-element.abstract";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { InnerPageElement, processBackgroundValue } from "@modules/constructor";
import { LZEditorElementFlexComponent } from "@modules/constructor/components/editor-element/components/editor-element-flex/editor-element-flex.component";
import { TabSelectionDirective, ToggleSelectionDirective } from "@shared-directives";
import { hostBinding } from "@modules/constructor/utils/host-binding";

@Component({
    selector: "lz-inner-element",
    templateUrl: "./inner.component.html",
    styleUrls: ["./inner.component.scss"],
    standalone: true,
    imports: [DragDropModule, LZEditorElementFlexComponent],
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

    public ngOnInit(): void {
        hostBinding(this.selectSlice("background", processBackgroundValue), "style.background", this.injector);

        hostBinding(this.selectSlice("justifyContent"), "style.justify-content", this.injector);
    }
}
