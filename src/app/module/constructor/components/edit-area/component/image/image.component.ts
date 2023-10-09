import { ChangeDetectionStrategy, Component, HostBinding, HostListener, OnInit, ViewEncapsulation, inject } from "@angular/core";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { Observable, map } from "rxjs";

import {
    AbstractEditorElementActionsService,
    AbstractEditorElementSettingsService,
    ELEMENT_ID,
    ImagePageElementSettings,
    processSettingValueWithUnit,
} from "@modules/constructor";
import { TabSelectionDirective, ToggleSelectionDirective } from "@shared-directives";

@Component({
    selector: "lz-image",
    standalone: true,
    imports: [CommonModule, NgOptimizedImage],
    templateUrl: "./image.component.html",
    styleUrls: ["./image.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    hostDirectives: [TabSelectionDirective, ToggleSelectionDirective],
})
export class ImageComponent implements OnInit {
    @HostBinding("class.lz-image")
    public hostClass = true;

    @HostBinding("$.style.height")
    @HostListener("$.style.height")
    public height$: Observable<string>;

    @HostBinding("$.style.width")
    @HostListener("$.style.width")
    public width$: Observable<string>;

    public title$: Observable<string>;

    public alt$: Observable<string>;

    public src$: Observable<string>;

    public readonly ELEMENT_ID = inject(ELEMENT_ID);

    private readonly elementActionsService = inject(AbstractEditorElementActionsService);

    private readonly elementSettingsService = inject(AbstractEditorElementSettingsService);

    private settings$: Observable<ImagePageElementSettings> = this.elementSettingsService.selectSettings(this.ELEMENT_ID);

    public ngOnInit(): void {
        this.width$ = this.settings$.pipe(map(settings => processSettingValueWithUnit(settings.width)));

        this.height$ = this.settings$.pipe(map(settings => processSettingValueWithUnit(settings.height)));

        this.title$ = this.settings$.pipe(map(settings => settings.image.title));

        this.alt$ = this.settings$.pipe(map(settings => settings.image.alt));

        this.src$ = this.settings$.pipe(map(settings => settings.image.src));
    }
}
