import { BaseElementAbstract } from "@modules/constructor/components/elements/base-element/base-element.abstract";
import { ChangeDetectionStrategy, Component, OnInit, Signal, ViewEncapsulation } from "@angular/core";
import {
    Directions,
    DividerPageElement,
    processBackgroundValue,
    processBorderSideData,
    processDirectionValue,
    processSettingValueWithUnit,
} from "@modules/constructor";
import { TabSelectionDirective, ToggleSelectionDirective } from "@shared-directives";
import { hostBinding } from "@modules/constructor/utils/host-binding";

@Component({
    selector: "lz-divider",
    templateUrl: "./divider.component.html",
    styleUrl: "./divider.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    hostDirectives: [TabSelectionDirective, ToggleSelectionDirective],
    imports: [],
    host: {
        class: "lz-divider",
    },
})
export class DividerComponent extends BaseElementAbstract<DividerPageElement> implements OnInit {
    public text: Signal<string> = this.selectSlice("text");

    public ngOnInit(): void {
        hostBinding(this.selectSlice("height", processSettingValueWithUnit), "style.height", this.injector);
        hostBinding(this.selectSlice("width", processSettingValueWithUnit), "style.--width", this.injector);
        hostBinding(this.selectSlice("margin", processDirectionValue), "style.margin", this.injector);
        hostBinding(this.selectSlice("padding", processDirectionValue), "style.padding", this.injector);
        hostBinding(this.selectSlice("background", processBackgroundValue), "style.background", this.injector);
        hostBinding(this.selectSlice("alignItems"), "style.align-items", this.injector);
        hostBinding(
            this.selectSlice("border", border => processBorderSideData(border, Directions.LEFT)),
            "style.border-left",
            this.injector,
        );
        hostBinding(
            this.selectSlice("border", border => processBorderSideData(border, Directions.RIGHT)),
            "style.border-right",
            this.injector,
        );
        hostBinding(
            this.selectSlice("border", border => processBorderSideData(border, Directions.TOP)),
            "style.border-top",
            this.injector,
        );
        hostBinding(
            this.selectSlice("border", border => processBorderSideData(border, Directions.BOTTOM)),
            "style.border-bottom",
            this.injector,
        );
        hostBinding(
            this.selectSlice("border", border => processBorderSideData(border, Directions.BOTTOM)),
            "style.--border-color",
            this.injector,
        );
        hostBinding(
            this.selectSlice("border", border => processDirectionValue(border.borderRadius)),
            "style.border-radius",
            this.injector,
        );
        hostBinding(
            this.selectSlice("lineBorder", lineBorder => processBorderSideData(lineBorder, Directions.BOTTOM)),
            "style.--border-bottom",
            this.injector,
        );
    }
}
