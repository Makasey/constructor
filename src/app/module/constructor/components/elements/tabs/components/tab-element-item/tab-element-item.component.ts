import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from "@angular/core";

import { BaseElementAbstract } from "@modules/constructor/components/elements/base-element/base-element.abstract";
import { LZEditorElementFlexComponent } from "@modules/constructor/components/editor-element/components/editor-element-flex/editor-element-flex.component";
import { TabSelectionDirective, ToggleSelectionDirective } from "@shared-directives";
import { TabsItemPageElement, processSettingValueWithUnit } from "@modules/constructor";
import { hostBinding } from "@modules/constructor/utils/host-binding";

@Component({
    selector: "lz-tab-element-item",
    imports: [LZEditorElementFlexComponent],
    templateUrl: "./tab-element-item.component.html",
    styleUrls: ["./tab-element-item.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    hostDirectives: [TabSelectionDirective, ToggleSelectionDirective],
    standalone: true,
    host: {
        class: "lz-tab-element-item",
    },
})
export class TabElementItemComponent extends BaseElementAbstract<TabsItemPageElement> implements OnInit {
    public ngOnInit(): void {
        hostBinding(this.selectSlice("height", processSettingValueWithUnit), "style.min-height", this.injector);

        hostBinding(this.selectSlice("width", processSettingValueWithUnit), "style.width", this.injector);
    }
}
