import { BaseElementAbstract } from "@modules/constructor/components/elements/base-element/base-element.abstract";
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";
import { TabSelectionDirective, ToggleSelectionDirective } from "@shared-directives";
import { TitlePageElement, processBackgroundValue, processSettingValueWithUnit } from "@modules/constructor";
import { hostBinding } from "@modules/constructor/utils/host-binding";

@Component({
    selector: "lz-title-element",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    templateUrl: "./title.component.html",
    styleUrls: ["./title.component.scss"],
    imports: [NgTemplateOutlet],
    hostDirectives: [TabSelectionDirective, ToggleSelectionDirective],
    host: {
        "[class.lz-title-element]": "true",
        "[class.editor-element]": "true",
    },
})
export class TitleComponent extends BaseElementAbstract<TitlePageElement> implements OnInit {
    public ngOnInit(): void {
        hostBinding(this.selectSlice("height", processSettingValueWithUnit), "style.min-height", this.injector);

        hostBinding(this.selectSlice("width", processSettingValueWithUnit), "style.width", this.injector);

        hostBinding(this.selectSlice("color"), "style.color", this.injector);

        hostBinding(this.selectSlice("background", processBackgroundValue), "style.background", this.injector);
    }
}
