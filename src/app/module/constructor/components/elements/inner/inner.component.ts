import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, HostBinding, OnInit, ViewEncapsulation } from "@angular/core";

import { BaseElementAbstract } from "@modules/constructor/components/elements/base-element/base-element.abstract";
import { ElementResolverDirective, TabSelectionDirective, ToggleSelectionDirective } from "@shared-directives";
import { InnerPageElement, LZEditorElementComponent, processBackgroundValue, processSettingValueWithUnit } from "@modules/constructor";
import { hostBinding } from "@modules/constructor/utils/host-binding";

@Component({
    selector: "lz-inner-element",
    templateUrl: "./inner.component.html",
    styleUrls: ["./inner.component.scss"],
    imports: [ElementResolverDirective, AsyncPipe, LZEditorElementComponent],
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
        hostBinding(this.selectSlice("width", processSettingValueWithUnit), "style.width", this.injector);

        hostBinding(this.selectSlice("height", processSettingValueWithUnit), "style.min-height", this.injector);

        hostBinding(this.selectSlice("background", processBackgroundValue), "style.background", this.injector);

        hostBinding(this.selectSlice("justifyContent"), "style.justify-content", this.injector);
    }
}
