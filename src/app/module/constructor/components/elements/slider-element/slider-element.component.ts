import {
    AbstractEditorElementActionsService,
    AbstractEditorElementSettingsService,
    ELEMENT_ID,
    LZEditorElementComponent,
    SliderPageElement,
    SliderPageElementSettings,
    processDirectionValue,
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
    computed,
    inject,
    signal,
    viewChild,
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

    @HostBinding("$.style.padding")
    @HostListener("$.style.padding")
    public padding$: Observable<string>;

    @HostBinding("$.style.margin")
    @HostListener("$.style.margin")
    public margin$: Observable<string>;

    private wrapRef = viewChild("wrapper");

    private elementRef = inject(ElementRef);
    public readonly ELEMENT_ID = inject(ELEMENT_ID);
    private readonly editorElementActionsService = inject(AbstractEditorElementActionsService);
    private readonly elementSettingsService = inject(AbstractEditorElementSettingsService);

    public readonly element: Signal<SliderPageElement> = toSignal(this.editorElementActionsService.selectElement(this.ELEMENT_ID));

    public readonly scrollingItemsCount: Signal<number> = computed(() => this.element().settings.scrollingItemsCount);

    public readonly showItemsCount: Signal<number> = computed(() => this.element().settings.showItemsCount);

    public position = signal(0);

    public autoSlide: Signal<boolean> = computed(() => this.element().settings.autoSlide);

    public autoSlideTimeout: Signal<number> = computed(() => this.element().settings.autoSlideTimeout);

    public convertedPosition = computed(() => `translateX(${this.position()}px)`);

    private settings$: Observable<SliderPageElementSettings> = this.elementSettingsService.selectSettings(this.ELEMENT_ID);

    public ngOnInit(): void {
        this.width$ = this.settings$.pipe(map(settings => processSettingValueWithUnit(settings.width)));
        this.height$ = this.settings$.pipe(map(settings => processSettingValueWithUnit(settings.height)));
        this.padding$ = this.settings$.pipe(map(settings => processDirectionValue(settings.padding)));
        this.margin$ = this.settings$.pipe(map(settings => processDirectionValue(settings.margin)));
    }

    public onNext(): void {
        return;
    }

    public onPrev(): void {
        return;
    }
}
