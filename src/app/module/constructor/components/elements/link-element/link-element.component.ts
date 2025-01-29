import { BaseElementAbstract } from "@modules/constructor/components/elements/base-element/base-element.abstract";
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from "@angular/core";
import { LinkPageElement, processBackgroundValue } from "@modules/constructor";
import { NgTemplateOutlet } from "@angular/common";
import { TabSelectionDirective, ToggleSelectionDirective } from "@shared-directives";
import { hostBinding } from "@modules/constructor/utils/host-binding";

@Component({
    selector: "lz-link-element",
    templateUrl: "./link-element.component.html",
    styleUrl: "./link-element.component.scss",
    hostDirectives: [TabSelectionDirective, ToggleSelectionDirective],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [NgTemplateOutlet],
    standalone: true,
    host: {
        class: "lz-link-element",
    },
})
export class LinkElementComponent extends BaseElementAbstract<LinkPageElement> implements OnInit {
    public ngOnInit(): void {
        hostBinding(this.selectSlice("color"), "style.color", this.injector);

        hostBinding(this.selectSlice("background", processBackgroundValue), "style.background", this.injector);

        // hostBinding(this.selectSlice("width"), "style.width", this.injector);
    }
}
