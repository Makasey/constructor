import {
    AbstractEditorElementActionsService,
    AbstractEditorElementSettingsService,
    ELEMENT_ID,
    LZEditorElementComponent,
    SliderPageElement,
    SliderPageElementSettings,
    processSettingValueWithUnit,
} from "@modules/constructor";
import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    ElementRef,
    HostBinding,
    HostListener,
    Injector,
    OnInit,
    Signal,
    ViewEncapsulation,
    WritableSignal,
    computed,
    effect,
    inject,
    signal,
    untracked,
    viewChild,
    viewChildren,
} from "@angular/core";
import { ElementResolverDirective, TabSelectionDirective, ToggleSelectionDirective } from "@shared-directives";
import { Observable, Subscription, interval, map, tap } from "rxjs";
import { takeUntilDestroyed, toSignal } from "@angular/core/rxjs-interop";

@Component({
    selector: "lz-slider-element",
    templateUrl: "./slider-element.component.html",
    styleUrl: "./slider-element.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ElementResolverDirective, LZEditorElementComponent],
    hostDirectives: [TabSelectionDirective, ToggleSelectionDirective],
    host: {
        class: "lz-slider-element",
    },
})
export class SliderElementComponent implements OnInit {
    @HostBinding("$.style.height")
    @HostListener("$.style.height")
    public height$: Observable<string>;

    @HostBinding("$.style.width")
    @HostListener("$.style.width")
    public width$: Observable<string>;

    public children: Signal<readonly LZEditorElementComponent[]> = viewChildren(LZEditorElementComponent);
    public wrapper: Signal<ElementRef<HTMLDivElement> | undefined> = viewChild("wrapper");

    public readonly ELEMENT_ID = inject(ELEMENT_ID);
    private readonly editorElementActionsService = inject(AbstractEditorElementActionsService);
    private readonly elementSettingsService = inject(AbstractEditorElementSettingsService);
    private readonly injector = inject(Injector);
    private readonly destroyRef = inject(DestroyRef);
    private readonly elementRef = inject(ElementRef);

    public readonly element: Signal<SliderPageElement> = toSignal(this.editorElementActionsService.selectElement(this.ELEMENT_ID));

    public readonly scrollingItemsCount: Signal<number> = computed(() => this.element().settings.scrollingItemsCount);

    public readonly showItemsCount: Signal<number> = computed(() => this.element().settings.showItemsCount);

    public readonly sliderItemsCount: Signal<number> = computed(() => this.element().settings.items.length);

    public readonly sliderGap: Signal<number> = computed(() => this.element().settings.gap);

    public readonly sliderGapWidth: Signal<number> = computed(() => this.sliderGap() * (this.showItemsCount() - 1));

    public readonly autoSlide: Signal<boolean> = computed(() => this.element().settings.autoSlide);

    public readonly autoSlideTimeout: Signal<number> = computed(() => this.element().settings.autoSlideTimeout);

    public readonly wrapperWidth: WritableSignal<number | undefined> = signal(this.elementRef.nativeElement.offsetWidth);

    public readonly calculateWrapperWidth: Signal<number> = computed(() => this.wrapperWidth()! * this.totalPages());

    @HostListener("resize", ["$event"])
    public onResize([element]: ResizeObserverEntry[]): void {
        this.wrapperWidth.set(element.contentRect.width);
    }

    public readonly sliderItemWidth: Signal<number> = computed(() => (this.wrapperWidth()! - this.sliderGapWidth()) / this.showItemsCount());

    public readonly convertedPosition: Signal<string> = computed(() => `translateX(${this.position()}px)`);

    public readonly isRightBoundary: Signal<boolean> = computed(() => {
        return this.currentPage() >= this.sliderItemsCount() - 1;
    });

    public readonly isLeftBoundary: Signal<boolean> = computed(() => {
        return this.currentPage() === 0;
    });

    public readonly totalPages: Signal<number> = computed(() => {
        const items = this.sliderItemsCount();
        const showItemsCount = this.showItemsCount();

        return Math.ceil(items / showItemsCount);
    });

    public position: WritableSignal<number> = signal(0);

    public currentPage: WritableSignal<number> = signal(0);

    private readonly settings$: Observable<SliderPageElementSettings> = this.elementSettingsService.selectSettings(this.ELEMENT_ID);

    public ngOnInit(): void {
        this.width$ = this.settings$.pipe(map(settings => processSettingValueWithUnit(settings.width)));
        this.height$ = this.settings$.pipe(map(settings => processSettingValueWithUnit(settings.height)));

        this.initAutoSlide();
    }

    public onNext(): void {
        const itemWidth = this.sliderItemWidth();
        const itemsCount = this.sliderItemsCount();
        const showItemsCount = this.showItemsCount();
        const scrollingItemsCount = this.scrollingItemsCount();
        const gap = this.sliderGap();
        const position = this.position();

        const leftItems = itemsCount - (Math.abs(position / (itemWidth + gap)) + showItemsCount);

        const calculatedPosition = leftItems > scrollingItemsCount ? (itemWidth + gap) * scrollingItemsCount : (itemWidth + gap) * leftItems;

        this.currentPage.update(value => value + scrollingItemsCount);
        this.position.update(position => position - calculatedPosition);
        this.initAutoSlide();
    }

    public onPrev(): void {
        const itemWidth = this.sliderItemWidth();
        const scrollingItemsCount = this.scrollingItemsCount();
        const gap = this.sliderGap();
        const position = this.position();

        const leftItems = Math.abs(position / (itemWidth + gap));
        const calculatedPosition = leftItems > scrollingItemsCount ? (itemWidth + gap) * scrollingItemsCount : (itemWidth + gap) * leftItems;

        this.currentPage.update(value => value - this.scrollingItemsCount());
        this.position.update(position => position + calculatedPosition);
        this.initAutoSlide();
    }

    private subscription: Subscription | null = null;

    private initAutoSlide(): void {
        let isRightSide: boolean;
        effect(
            () => {
                if (this.subscription) {
                    this.subscription.unsubscribe();
                    this.subscription = null;
                }

                if (this.autoSlide()) {
                    this.subscription = interval(this.autoSlideTimeout())
                        .pipe(
                            tap(() => {
                                if (untracked(() => this.isRightBoundary())) {
                                    isRightSide = true;
                                }

                                if (untracked(() => this.isLeftBoundary())) {
                                    isRightSide = false;
                                }

                                if (isRightSide) {
                                    this.onPrev();
                                } else {
                                    this.onNext();
                                }
                            }),
                            takeUntilDestroyed(this.destroyRef),
                        )
                        .subscribe();
                }
            },
            { injector: this.injector },
        );
    }
}
