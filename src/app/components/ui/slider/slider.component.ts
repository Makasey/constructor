import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    Input,
    OnInit,
    Renderer2,
    RendererStyleFlags2,
    TemplateRef,
    ViewChild,
} from "@angular/core";

import { Observable, interval, tap } from "rxjs";

import { LZSliderConfig, LZSliderItem, lzDefaultItemClass, lzDefaultSliderConfig, sliderItemWidthVariableName } from "./types";
import { SliderItemTemplateData } from "@components";

@Component({
    selector: "lz-slider",
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: "./slider.component.html",
})
export class LZSliderComponent implements OnInit {
    @Input()
    public items: LZSliderItem[] = [
        { title: "12345" },
        { title: "12345" },
        { title: "12345" },
        { title: "12345" },
        { title: "12345" },
        { title: "12345" },
    ];

    @Input()
    public itemTemplate: TemplateRef<SliderItemTemplateData>;

    @Input()
    public sliderConfig: LZSliderConfig = lzDefaultSliderConfig;

    @Input()
    public itemClass: string = lzDefaultItemClass;

    @HostBinding("class.lz-slider")
    public hostClass = true;

    @ViewChild("slider", { static: true })
    public sliderRef: ElementRef<unknown>;

    public get position(): number {
        return this._sliderPosition;
    }

    public get convertedPosition(): string {
        return `translateX(${this.position}px)`;
    }

    public set position(position: number) {
        this._sliderPosition = position;
    }

    public get isLeftEdge(): boolean {
        return this.position === 0;
    }

    public get isRightEdge(): boolean {
        const rightEdgePosition = (this._sliderItemsCount - this._sliderItemsPerPage) * this._sliderItemWidth;

        return Math.abs(this.position) === rightEdgePosition;
    }

    public autoSlide$: Observable<number>;

    public rightEdge = this.isRightEdge;

    private _sliderItemWidth: number;

    private _sliderWidth: number;

    private _sliderPosition = 0;

    private _sliderItemsCount = 0;

    private _sliderItemsPerPage = 0;

    private _sliderItemsPerSlide = 0;

    private _sliderTimeout = 1000;

    constructor(
        private renderer: Renderer2,
        private elementRef: ElementRef,
    ) {}

    public ngOnInit(): void {
        this._sliderWidth = (this.elementRef.nativeElement as HTMLElement).offsetWidth;

        this._sliderItemsCount = this.items.length;

        const { itemsPerPage, itemsPerSlide, autoSlide, timeout } = this.sliderConfig;

        if (autoSlide) {
            this._sliderTimeout = timeout;
            this.initAutoSlide();
        }

        this._sliderItemsPerPage = itemsPerPage;

        this._sliderItemsPerSlide = itemsPerSlide;

        this._sliderItemWidth = this._sliderWidth / itemsPerPage;

        this.updateSliderItemWidth();
    }

    public onPrev(): void {
        this.onPrevItem();
        this.resetAutoSlide();
    }

    public onNext(): void {
        this.onNextItem();
        this.resetAutoSlide();
    }

    private updateSliderItemWidth(): void {
        this.renderer.setStyle(this.sliderRef.nativeElement, sliderItemWidthVariableName, this._sliderItemWidth + "px", RendererStyleFlags2.DashCase);
    }

    private onNextItem(): void {
        const leftItems = this._sliderItemsCount - (Math.abs(this.position / this._sliderItemWidth) + this._sliderItemsPerPage);

        this.position =
            this.position -
            (leftItems > this._sliderItemsPerSlide ? this._sliderItemsPerSlide * this._sliderItemWidth : leftItems * this._sliderItemWidth);
    }

    private onPrevItem(): void {
        const leftItems = Math.abs(this.position / this._sliderItemWidth);

        this.position +=
            leftItems > this._sliderItemsPerSlide ? this._sliderItemsPerSlide * this._sliderItemWidth : leftItems * this._sliderItemWidth;
    }

    private initAutoSlide(): void {
        this.autoSlide$ = interval(this._sliderTimeout).pipe(
            tap(() => {
                if (this.isRightEdge) {
                    this.rightEdge = true;
                }

                if (this.isLeftEdge) {
                    this.rightEdge = false;
                }

                this.rightEdge ? this.onPrevItem() : this.onNextItem();
            }),
        );
    }

    private resetAutoSlide(): void {
        if (!this.autoSlide$) {
            return;
        }

        this.initAutoSlide();
    }
}
