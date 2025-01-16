import {
    AbstractEditorElementActionsService,
    AbstractEditorElementSettingsService,
    ELEMENT_ID,
    LZEditorElementComponent,
    SliderItemPageElement,
    SliderPageElementItemSettings,
    processBackgroundValue,
} from "@modules/constructor";
import { ChangeDetectionStrategy, Component, HostBinding, HostListener, OnInit, Signal, ViewEncapsulation, inject } from "@angular/core";
import { ElementResolverDirective, TabSelectionDirective, ToggleSelectionDirective } from "@shared-directives";
import { Observable, map } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
    selector: "lz-slider-element-item",
    templateUrl: "./slider-element-item.component.html",
    styleUrl: "./slider-element-item.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    hostDirectives: [TabSelectionDirective, ToggleSelectionDirective],
    standalone: true,
    host: {
        class: "lz-slider-element-item",
    },
    imports: [LZEditorElementComponent, ElementResolverDirective],
})
export class SliderElementItemComponent implements OnInit {
    @HostBinding("$.style.background")
    @HostListener("$.style.background")
    public background$: Observable<string>;

    public readonly ELEMENT_ID = inject(ELEMENT_ID);
    private readonly editorElementActionsService = inject(AbstractEditorElementActionsService);
    public readonly element: Signal<SliderItemPageElement> = toSignal(this.editorElementActionsService.selectElement(this.ELEMENT_ID));
    private readonly elementSettingsService = inject(AbstractEditorElementSettingsService);

    private settings$: Observable<SliderPageElementItemSettings> = this.elementSettingsService.selectSettings(this.ELEMENT_ID);

    public ngOnInit(): void {
        this.background$ = this.settings$.pipe(map(settings => processBackgroundValue(settings.background)));
    }
}
