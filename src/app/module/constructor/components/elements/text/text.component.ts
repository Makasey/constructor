import { BaseElementAbstract } from "@modules/constructor/components/elements/base-element/base-element.abstract";
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from "@angular/core";
import { TabSelectionDirective, ToggleSelectionDirective } from "@shared-directives";
import { TextPageElement, processBackgroundValue, processSettingValueWithUnit } from "@modules/constructor";
import { hostBinding } from "@modules/constructor/utils/host-binding";

@Component({
    selector: "lz-text-element",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    templateUrl: "./text.component.html",
    styleUrls: ["./text.component.scss"],
    imports: [],
    hostDirectives: [TabSelectionDirective, ToggleSelectionDirective],
    host: {
        "[class.lz-text-element]": "true",
        "[class.editor-element]": "true",
    },
})
export class TextComponent extends BaseElementAbstract<TextPageElement> implements OnInit {
    public ngOnInit(): void {
        hostBinding(this.selectSlice("height", processSettingValueWithUnit), "style.min-height", this.injector);

        hostBinding(this.selectSlice("width", processSettingValueWithUnit), "style.width", this.injector);

        hostBinding(this.selectSlice("color"), "style.color", this.injector);

        hostBinding(this.selectSlice("background", processBackgroundValue), "style.background", this.injector);
    }
}
