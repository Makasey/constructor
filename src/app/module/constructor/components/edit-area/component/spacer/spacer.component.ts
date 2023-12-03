import {
    AbstractEditorElementSettingsService,
    ELEMENT_ID,
    SectionPageElementSettings,
    processBackgroundValue,
    processDirectionValue,
    processSettingValueWithUnit,
} from "@modules/constructor";
import { ChangeDetectionStrategy, Component, HostBinding, HostListener, OnInit, ViewEncapsulation, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Observable, map } from "rxjs";
import { TabSelectionDirective, ToggleSelectionDirective } from "@shared-directives";

@Component({
    selector: "lz-spacer",
    templateUrl: "./spacer.component.html",
    styleUrl: "./spacer.component.scss",
    standalone: true,
    imports: [CommonModule],
    hostDirectives: [TabSelectionDirective, ToggleSelectionDirective],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class SpacerComponent implements OnInit {
    @HostBinding("class.lz-spacer")
    public hostClass = true;

    @HostBinding("$.style.height")
    @HostListener("$.style.height")
    public height$: Observable<string>;

    @HostBinding("$.style.width")
    @HostListener("$.style.width")
    public width$: Observable<string>;

    @HostBinding("$.style.margin")
    @HostListener("$.style.margin")
    public margin$: Observable<string>;

    @HostBinding("$.style.padding")
    @HostListener("$.style.padding")
    public padding$: Observable<string>;

    @HostBinding("$.style.background")
    @HostListener("$.style.background")
    public background$: Observable<string>;

    public readonly ELEMENT_ID = inject(ELEMENT_ID);

    private readonly abstractEditorElementSettingsService = inject(AbstractEditorElementSettingsService);

    private readonly spacerSettings$: Observable<SectionPageElementSettings> = this.abstractEditorElementSettingsService.selectSettings(
        this.ELEMENT_ID,
    );

    public ngOnInit(): void {
        this.width$ = this.spacerSettings$.pipe(map(settings => processSettingValueWithUnit(settings.width)));

        this.height$ = this.spacerSettings$.pipe(map(settings => processSettingValueWithUnit(settings.height)));

        this.margin$ = this.spacerSettings$.pipe(map(settings => processDirectionValue(settings.margin)));

        this.padding$ = this.spacerSettings$.pipe(map(settings => processDirectionValue(settings.padding)));

        this.background$ = this.spacerSettings$.pipe(map(settings => processBackgroundValue(settings.background)));
    }
}
