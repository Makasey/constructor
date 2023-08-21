import { ChangeDetectionStrategy, Component, HostBinding, Input, TemplateRef } from "@angular/core";
import { LZSliderItem } from "@components/ui";

export type SliderItemTemplateData = { item: LZSliderItem };

@Component({
    selector: "lz-slider-item",
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: "./slider-item.component.html",
})
export class LZSliderItemComponent {
    @Input()
    public itemTemplate: TemplateRef<SliderItemTemplateData>;

    @Input()
    @HostBinding("class")
    public get itemClass(): string {
        return this._itemClass;
    }

    public set itemClass(itemClass: string) {
        this._itemClass = itemClass ?? "";
    }

    @Input()
    public item: unknown;

    @HostBinding("class.lz-slider-item")
    public hostClass = true;

    public _itemClass = "";
}
