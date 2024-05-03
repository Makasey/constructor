import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, HostBinding, HostListener, OnInit, ViewEncapsulation, inject } from "@angular/core";
import { Observable, map } from "rxjs";

import {
    AbstractEditorElementActionsService,
    AbstractEditorElementSettingsService,
    ELEMENT_ID,
    InnerPageElement,
    LZEditorElementComponent,
    SectionPageElementSettings,
    processBackgroundValue,
    processSettingValueWithUnit,
} from "@modules/constructor";
import { ElementResolverDirective, TabSelectionDirective, ToggleSelectionDirective } from "@shared-directives";

@Component({
    selector: "lz-inner-element",
    templateUrl: "./inner.component.html",
    styleUrls: ["./inner.component.scss"],
    standalone: true,
    imports: [ElementResolverDirective, AsyncPipe, LZEditorElementComponent],
    hostDirectives: [TabSelectionDirective, ToggleSelectionDirective],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InnerComponent implements OnInit {
    @HostBinding("class")
    public readonly classes = {
        "editor-element": true,
        "lz-inner-element": true,
    };

    @HostBinding("$.style.min-height")
    @HostListener("$.style.min-height")
    public height$: Observable<string>;

    @HostBinding("$.style.width")
    @HostListener("$.style.width")
    public width$: Observable<string>;

    @HostBinding("$.style.background")
    @HostListener("$.style.background")
    public background$: Observable<string>;

    @HostBinding("$.style.justify-content")
    @HostListener("$.style.justify-content")
    public justifyContent$: Observable<string>;

    public readonly ELEMENT_ID = inject(ELEMENT_ID);

    private readonly abstractEditorElementActionsService = inject(AbstractEditorElementActionsService);

    private readonly abstractEditorElementSettingsService = inject(AbstractEditorElementSettingsService);

    public readonly element$: Observable<InnerPageElement> = this.abstractEditorElementActionsService.selectElement(this.ELEMENT_ID);

    private readonly innerSettings$: Observable<SectionPageElementSettings> = this.abstractEditorElementSettingsService.selectSettings(
        this.ELEMENT_ID,
    );

    public ngOnInit(): void {
        this.width$ = this.innerSettings$.pipe(map(settings => processSettingValueWithUnit(settings.width)));

        this.height$ = this.innerSettings$.pipe(map(settings => processSettingValueWithUnit(settings.height)));

        this.background$ = this.innerSettings$.pipe(map(settings => processBackgroundValue(settings.background)));

        this.justifyContent$ = this.innerSettings$.pipe(map(settings => settings.justifyContent));
    }
}
