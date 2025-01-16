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
    OnInit,
    Renderer2,
    Signal,
    ViewEncapsulation,
    WritableSignal,
    computed,
    inject,
    signal,
    viewChild,
    viewChildren,
} from "@angular/core";
import { ElementResolverDirective, TabSelectionDirective, ToggleSelectionDirective } from "@shared-directives";
import { Observable, interval, map } from "rxjs";
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

    public children = viewChildren(LZEditorElementComponent);

    private wrapRef = viewChild("wrapper");

    private elementRef = inject(ElementRef);
    public readonly ELEMENT_ID = inject(ELEMENT_ID);
    private readonly renderer = inject(Renderer2);
    private readonly editorElementActionsService = inject(AbstractEditorElementActionsService);
    private readonly elementSettingsService = inject(AbstractEditorElementSettingsService);

    public readonly element: Signal<SliderPageElement> = toSignal(this.editorElementActionsService.selectElement(this.ELEMENT_ID));

    public readonly scrollingItemsCount: Signal<number> = computed(() => this.element().settings.scrollingItemsCount);

    public readonly showItemsCount: Signal<number> = computed(() => this.element().settings.showItemsCount);

    public readonly sliderItemsCount: Signal<number> = computed(() => this.element().settings.items.length);

    public position: WritableSignal<number> = signal(0);

    public autoSlide: Signal<boolean> = computed(() => this.element().settings.autoSlide);

    public autoSlideTimeout: Signal<number> = computed(() => this.element().settings.autoSlideTimeout);

    public totalPages = computed(() => {
        const items = this.sliderItemsCount();
        const showItemsCount = this.showItemsCount();

        return Math.ceil(items / showItemsCount);
    });

    public currentPage = signal(0);

    public convertedPosition = computed(() => `translateX(${this.position()}px)`);

    public sliderWidth: WritableSignal<number> = signal(0);

    public sliderItemWidth: WritableSignal<number> = signal(200);

    public processLeftPosition = computed(() => this.position() === 0);

    public processRightPosition = computed(() => {
        const rightPosition = (this.sliderItemsCount() - this.showItemsCount()) * this.sliderItemWidth();

        return Math.abs(this.position()) === rightPosition;
    });

    public isRightSide: boolean;

    public isRightBoundary = computed(() => {
        return this.currentPage() >= this.totalPages() - 1;
    });

    public isLeftBoundary = computed(() => {
        return this.currentPage() === 0;
    });

    public initAutoSlide = toSignal(
        interval(this.autoSlideTimeout())
            .pipe
            // tap(() => {
            //     if (this.processRightPosition()) {
            //         this.isRightSide = true;
            //     }
            //
            //     if (this.processLeftPosition()) {
            //         this.isRightSide = false;
            //     }
            //
            //     if (this.isRightSide) {
            //         this.onPrev();
            //     }
            //
            //     this.onNext();
            // }),
            (),
    );

    private readonly settings$: Observable<SliderPageElementSettings> = this.elementSettingsService.selectSettings(this.ELEMENT_ID);

    public ngOnInit(): void {
        this.width$ = this.settings$.pipe(map(settings => processSettingValueWithUnit(settings.width)));
        this.height$ = this.settings$.pipe(map(settings => processSettingValueWithUnit(settings.height)));

        this.sliderWidth.set(this.elementRef.nativeElement.offsetWidth);
        // this.initAutoSlide();
    }

    public onNext(): void {
        // const leftItems = this.sliderItemsCount() - (Math.abs(this.position() / this.sliderItemWidth()) + this.showItemsCount());
        const page = this.currentPage();
        const visibleChildren = this.children().slice(page * this.showItemsCount(), page * this.showItemsCount() + this.showItemsCount());

        const childrenWidth = visibleChildren.reduce((acc, item) => acc + item.element.nativeElement.offsetWidth, 0);

        const position = this.position() - childrenWidth;

        this.currentPage.update(value => value + 1);
        this.position.set(position);
    }

    public onPrev(): void {
        const leftItems = Math.abs(this.position() / this.sliderItemWidth());

        const position =
            this.position() +
            (leftItems > this.showItemsCount() ? this.showItemsCount() * this.sliderItemWidth() : leftItems * this.sliderItemWidth());

        this.position.set(position);
    }
}
