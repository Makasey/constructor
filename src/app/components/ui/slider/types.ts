export type LZSliderItem = Readonly<{
    id?: number | string;

    [key: string]: unknown;
}>;

export type LZSliderConfig = Readonly<{
    itemsPerPage: number;
    itemsPerSlide: number;
    timeout: number;
    autoSlide: boolean;
}>;

export const lzDefaultSliderConfig: LZSliderConfig = {
    itemsPerPage: 2,
    itemsPerSlide: 1,
    timeout: 5000,
    autoSlide: false,
};

export const lzDefaultItemClass = "slider-item";

export const sliderItemWidthVariableName = "--slider-item-width";

export type SliderItemTemplateData = { item: LZSliderItem };
