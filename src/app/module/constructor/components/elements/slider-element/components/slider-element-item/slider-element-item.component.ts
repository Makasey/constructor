import { BaseElementAbstract } from "@modules/constructor/components/elements/base-element/base-element.abstract";
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation, inject } from "@angular/core";
import { LZEditorElementFlexComponent } from "@modules/constructor/components/editor-element/components/editor-element-flex/editor-element-flex.component";
import { PARENT_ID, SliderItemPageElement, processBackgroundValue } from "@modules/constructor";
import { TabSelectionDirective, ToggleSelectionDirective } from "@shared-directives";
import { hostBinding } from "@modules/constructor/utils/host-binding";

@Component({
    selector: "lz-slider-element-item",
    templateUrl: "./slider-element-item.component.html",
    styleUrl: "./slider-element-item.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    hostDirectives: [TabSelectionDirective, ToggleSelectionDirective],
    standalone: true,
    host: {
        class: "lz-slider-element-item",
    },
    imports: [LZEditorElementFlexComponent],
})
export class SliderElementItemComponent extends BaseElementAbstract<SliderItemPageElement> implements OnInit {
    protected readonly parentId = inject(PARENT_ID);
    public ngOnInit(): void {
        hostBinding(this.selectSlice("background", processBackgroundValue), "style.background", this.injector);
    }
}
