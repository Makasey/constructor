import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";
import { TabSelectionDirective, ToggleSelectionDirective } from "@shared-directives";

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
    imports: [],
})
export class SliderElementItemComponent {}
