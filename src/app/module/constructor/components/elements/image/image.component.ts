import { ChangeDetectionStrategy, Component, OnInit, Signal, ViewEncapsulation } from "@angular/core";

import { BaseElementAbstract } from "@modules/constructor/components/elements/base-element/base-element.abstract";
import { ImagePageElement, ObjectFit, processSettingValueWithUnit } from "@modules/constructor";
import { TabSelectionDirective, ToggleSelectionDirective } from "@shared-directives";
import { hostBinding } from "@modules/constructor/utils/host-binding";

@Component({
    selector: "lz-image-element",
    imports: [],
    templateUrl: "./image.component.html",
    styleUrls: ["./image.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    hostDirectives: [TabSelectionDirective, ToggleSelectionDirective],
    host: {
        "[class.editor-element]": "true",
        "[class.lz-image]": "true",
    },
})
export class ImageComponent extends BaseElementAbstract<ImagePageElement> implements OnInit {
    public objectFit: Signal<ObjectFit> = this.selectSlice("objectFit");
    public objectPosition: Signal<string> = this.selectSlice("objectPosition");
    public title: Signal<string> = this.selectSlice("image", image => image.title);
    public alt: Signal<string> = this.selectSlice("image", image => image.alt);
    public src: Signal<string> = this.selectSlice("image", image => image.src);

    public ngOnInit(): void {
        hostBinding(this.selectSlice("height", processSettingValueWithUnit), "style.height", this.injector);
        hostBinding(this.selectSlice("width", processSettingValueWithUnit), "style.width", this.injector);
        hostBinding(this.selectSlice("maxWidth", processSettingValueWithUnit), "style.max-width", this.injector);
    }
}
