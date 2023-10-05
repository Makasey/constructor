import { ChangeDetectionStrategy, Component, HostBinding, HostListener, OnInit, ViewEncapsulation, inject } from "@angular/core";
import { CommonModule } from "@angular/common";

import {
    AbstractEditorElementActionsService,
    AbstractEditorElementSettingsService,
    ELEMENT_ID,
    InnerPageElement,
    SectionPageElementSettings,
    processSettingValueWithUnit,
} from "@modules/constructor";
import { ElementResolverDirective, TabSelectionDirective, ToggleSelectionDirective } from "@shared-directives";
import { Observable, map } from "rxjs";

@Component({
    selector: "lz-inner-element",
    templateUrl: "./inner.component.html",
    styleUrls: ["./inner.component.scss"],
    standalone: true,
    imports: [CommonModule, ElementResolverDirective],
    hostDirectives: [TabSelectionDirective, ToggleSelectionDirective],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InnerComponent implements OnInit {
    @HostBinding("class")
    public classes = {
        "editor-element": true,
        "lz-inner-element": true,
    };

    @HostBinding("$.style.height")
    @HostListener("$.style.height")
    public height$: Observable<string>;

    @HostBinding("$.style.width")
    @HostListener("$.style.width")
    public width$: Observable<string>;

    @HostBinding("$.style.background-color")
    @HostListener("$.style.background-color")
    public backgroundColor$: Observable<string>;

    @HostBinding("$.style.justify-content")
    @HostListener("$.style.justify-content")
    public justifyContent$: Observable<string>;

    public readonly ELEMENT_ID = inject(ELEMENT_ID);

    private readonly abstractEditorElementActionsService = inject(AbstractEditorElementActionsService);

    private readonly abstractEditorElementSettingsService = inject(AbstractEditorElementSettingsService);

    public element$: Observable<InnerPageElement> = this.abstractEditorElementActionsService.selectElement(this.ELEMENT_ID);

    private innerSettings$: Observable<SectionPageElementSettings> = this.abstractEditorElementSettingsService.selectSettings(this.ELEMENT_ID);

    public ngOnInit(): void {
        this.width$ = this.innerSettings$.pipe(map(settings => processSettingValueWithUnit(settings.width)));

        this.height$ = this.innerSettings$.pipe(map(settings => processSettingValueWithUnit(settings.height)));

        this.backgroundColor$ = this.innerSettings$.pipe(map(settings => settings.backgroundColor));

        this.justifyContent$ = this.innerSettings$.pipe(map(settings => settings.justifyContent!));
    }

    public _trackBy(_: number, item: number): number {
        return item;
    }
}
