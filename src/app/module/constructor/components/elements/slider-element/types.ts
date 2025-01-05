import { Direction } from "@components";
import { SitePageElement, SitePageElementSizeSettings } from "@modules/constructor";
import { SliderPageElementItemSettings } from "@modules/constructor/components/elements/slider-element/components/slider-element-item";

export type SliderPageElement = SitePageElement<SliderPageElementSettings>;

export type SliderPageElementSettings = Readonly<{
    padding: Direction;
    margin: Direction;
    count: number;
    selectedElement: string;
    items: SliderPageElementItemSettings[];
}> &
    SitePageElementSizeSettings;
