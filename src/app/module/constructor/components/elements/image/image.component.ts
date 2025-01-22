import { AsyncPipe, NgOptimizedImage, NgStyle } from "@angular/common";
import { ChangeDetectionStrategy, Component, HostBinding, HostListener, OnInit, ViewEncapsulation, inject } from "@angular/core";
import { Observable, map } from "rxjs";

import {
    AbstractEditorElementSettingsService,
    ELEMENT_ID,
    ImagePageElementSettings,
    LZElementActionsComponent,
    processObjectFitPositionValue,
    processObjectFitValue,
    processSettingValueWithUnit,
} from "@modules/constructor";
import { TabSelectionDirective, ToggleSelectionDirective } from "@shared-directives";

@Component({
    selector: "lz-image-element",
    imports: [NgOptimizedImage, LZElementActionsComponent, AsyncPipe, NgStyle],
    templateUrl: "./image.component.html",
    styleUrls: ["./image.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    hostDirectives: [TabSelectionDirective, ToggleSelectionDirective],
})
export class ImageComponent implements OnInit {
    @HostBinding("class")
    public readonly classes = {
        "editor-element": true,
        "lz-image": true,
    };

    @HostBinding("$.style.height")
    @HostListener("$.style.height")
    public height$: Observable<string>;

    @HostBinding("$.style.width")
    @HostListener("$.style.width")
    public width$: Observable<string>;

    @HostBinding("$.style.max-width")
    @HostListener("$.style.max-width")
    public maxWidth$: Observable<string>;

    public objectFit$: Observable<string>;

    public objectPosition$: Observable<string>;

    public title$: Observable<string>;

    public alt$: Observable<string>;

    public src$: Observable<string>;

    public readonly ELEMENT_ID = inject(ELEMENT_ID);

    private readonly elementSettingsService = inject(AbstractEditorElementSettingsService);

    private readonly settings$: Observable<ImagePageElementSettings> = this.elementSettingsService.selectSettings(this.ELEMENT_ID);

    public ngOnInit(): void {
        this.width$ = this.settings$.pipe(map(settings => processSettingValueWithUnit(settings.width)));

        this.height$ = this.settings$.pipe(map(settings => processSettingValueWithUnit(settings.height)));

        this.title$ = this.settings$.pipe(map(settings => settings.image.title));

        this.alt$ = this.settings$.pipe(map(settings => settings.image.alt));

        this.src$ = this.settings$.pipe(map(settings => settings.image.src));

        this.maxWidth$ = this.settings$.pipe(map(settings => processSettingValueWithUnit(settings.maxWidth)));

        this.objectPosition$ = this.settings$.pipe(map(settings => processObjectFitPositionValue(settings.objectPosition)));

        this.objectFit$ = this.settings$.pipe(map(settings => processObjectFitValue(settings.objectFit)));
    }
}
