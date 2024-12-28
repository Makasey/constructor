import { ChangeDetectionStrategy, Component, HostBinding, Input, TemplateRef, input } from "@angular/core";
import { SliderItemTemplateData } from "@components";
import { NgTemplateOutlet, JsonPipe } from "@angular/common";

@Component({
    selector: "lz-slider-item",
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: "./slider-item.component.html",
    imports: [NgTemplateOutlet, JsonPipe]
})
export class LZSliderItemComponent {
    public readonly itemTemplate = input<TemplateRef<SliderItemTemplateData>>();

    @Input()
    @HostBinding("class")
    public get itemClass(): string {
        return this._itemClass;
    }

    public set itemClass(itemClass: string) {
        this._itemClass = itemClass ?? "";
    }

    public readonly item = input<unknown>();

    @HostBinding("class.lz-slider-item")
    public hostClass = true;

    public _itemClass = "";
}
