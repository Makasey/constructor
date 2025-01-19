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
import { Observable, map } from "rxjs";
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

    public readonly element: Signal<SliderPageElement> = toSignal(this.editorElementActionsService.selectElement(this.ELEMENT_ID));

    public readonly scrollingItemsCount: Signal<number> = computed(() => this.element().settings.scrollingItemsCount);

    public readonly showItemsCount: Signal<number> = computed(() => this.element().settings.showItemsCount);

    public readonly sliderItemsCount: Signal<number> = computed(() => this.element().settings.items.length);

    public readonly sliderGap = computed(() => this.element().settings.gap);

    public readonly autoSlide: Signal<boolean> = computed(() => this.element().settings.autoSlide);

    public readonly autoSlideTimeout: Signal<number> = computed(() => this.element().settings.autoSlideTimeout);

    public readonly wrapperWidth = computed(() => this.wrapper()?.nativeElement.offsetWidth);

    public readonly calculateWrapperWidth = computed(() => this.wrapperWidth()! * this.totalPages());

    public readonly sliderItemWidth = computed(() => this.wrapperWidth()! / this.showItemsCount());

    public readonly convertedPosition = computed(() => `translateX(${this.position()}px)`);

    public readonly isRightBoundary = computed(() => {
        return this.currentPage() >= this.totalPages() - 1;
    });

    public readonly isLeftBoundary = computed(() => {
        return this.currentPage() === 0;
    });

    public readonly totalPages = computed(() => {
        const items = this.sliderItemsCount();
        const showItemsCount = this.showItemsCount();

        return Math.ceil(items / showItemsCount);
    });

    public position: WritableSignal<number> = signal(0);

    public currentPage: WritableSignal<number> = signal(0);

    // public initAutoSlide = toSignal(
    //     interval(this.autoSlideTimeout()).pipe(
    //         tap(() => {
    //             if (this.isRightBoundary()) {
    //                 this.isRightSide = true;
    //             }
    //
    //             if (this.isLeftBoundary()) {
    //                 this.isRightSide = false;
    //             }
    //
    //             // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    //             this.isRightSide ? this.onPrev() : this.onNext();
    //         }),
    //     ),
    // );

    private readonly settings$: Observable<SliderPageElementSettings> = this.elementSettingsService.selectSettings(this.ELEMENT_ID);

    public ngOnInit(): void {
        this.width$ = this.settings$.pipe(map(settings => processSettingValueWithUnit(settings.width)));
        this.height$ = this.settings$.pipe(map(settings => processSettingValueWithUnit(settings.height)));
    }

    public onNext(): void {
        const page = this.currentPage();
        const visibleChildren = this.children().slice(page * this.showItemsCount(), page * this.showItemsCount() + this.showItemsCount());
        const childrenWidth = visibleChildren.reduce((acc, item) => acc + item.element.nativeElement.offsetWidth, 0);

        const position = this.position() - childrenWidth;
        this.currentPage.update(value => value + 1);
        this.position.set(position);
    }

    public onPrev(): void {
        const page = this.currentPage();
        const visibleChildren = this.children().slice(page * this.showItemsCount() - this.showItemsCount(), page * this.showItemsCount());
        const childrenWidth = visibleChildren.reduce((acc, item) => acc + item.element.nativeElement.offsetWidth, 0);

        const position = this.position() + childrenWidth;
        this.currentPage.update(value => value - 1);
        this.position.set(position);
    }
}
