import { AccordionPageElement, LZEditorElementComponent, processDirectionValue, processSettingValueWithUnit } from "@modules/constructor";
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from "@angular/core";

import { BaseElementAbstract } from "@modules/constructor/components/elements/base-element/base-element.abstract";
import { ElementResolverDirective, TabSelectionDirective, ToggleSelectionDirective } from "@shared-directives";
import { hostBinding } from "@modules/constructor/utils/host-binding";

@Component({
    selector: "lz-accordion-element",
    imports: [LZEditorElementComponent, ElementResolverDirective],
    templateUrl: "./accordion-element.component.html",
    styleUrl: "./accordion-element.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    hostDirectives: [TabSelectionDirective, ToggleSelectionDirective],
    standalone: true,
    host: {
        class: "lz-accordion-element",
    },
})
export class AccordionElementComponent extends BaseElementAbstract<AccordionPageElement> implements OnInit {
    public ngOnInit(): void {
        hostBinding(this.selectSlice("height", processSettingValueWithUnit), "style.min-height", this.injector);
        hostBinding(this.selectSlice("width", processSettingValueWithUnit), "style.width", this.injector);
        hostBinding(this.selectSlice("padding", processDirectionValue), "style.padding", this.injector);
        hostBinding(this.selectSlice("margin", processDirectionValue), "style.margin", this.injector);
    }
}
