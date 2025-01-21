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
import { toSignal } from "@angular/core/rxjs-interop";

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

    public readonly element: Signal<SliderPageElement> = toSignal(this.editorElementActionsService.selectElement(this.ELEMENT_ID));

    public readonly scrollingItemsCount: Signal<number> = computed(() => this.element().settings.scrollingItemsCount);

    public readonly showItemsCount: Signal<number> = computed(() => this.element().settings.showItemsCount);

    public readonly sliderItemsCount: Signal<number> = computed(() => this.element().settings.items.length);

    public readonly sliderGap: Signal<number> = computed(() => this.element().settings.gap);

    public readonly sliderGapWidth: Signal<number> = computed(() => this.sliderGap() * this.showItemsCount());

    public readonly autoSlide: Signal<boolean> = computed(() => this.element().settings.autoSlide);

    public readonly autoSlideTimeout: Signal<number> = computed(() => this.element().settings.autoSlideTimeout);

    public readonly wrapperWidth: Signal<number | undefined> = computed(() => this.wrapper()?.nativeElement.offsetWidth);

    public readonly calculateWrapperWidth: Signal<number> = computed(() => this.wrapperWidth()! * this.totalPages());

    public readonly sliderItemWidth: Signal<number> = computed(() => this.wrapperWidth()! / this.showItemsCount());

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
        const page = this.currentPage();
        const visibleChildren = this.children().slice(page, page + this.scrollingItemsCount());
        const childrenWidth = visibleChildren.reduce((acc, item) => acc + item.element.nativeElement.offsetWidth, 0);

        const position = this.position() - childrenWidth - this.sliderGapWidth();
        this.currentPage.update(value => value + this.scrollingItemsCount());
        this.position.set(position);
    }

    public onPrev(): void {
        const page = this.currentPage();
        const visibleChildren = this.children().slice(page - this.scrollingItemsCount(), page);
        const childrenWidth = visibleChildren.reduce((acc, item) => acc + item.element.nativeElement.offsetWidth, 0);

        const position = this.position() + childrenWidth + this.sliderGapWidth();
        this.currentPage.update(value => value - this.scrollingItemsCount());
        this.position.set(position);
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
                        )
                        .subscribe();
                }
            },
            { injector: this.injector },
        );
    }
}
