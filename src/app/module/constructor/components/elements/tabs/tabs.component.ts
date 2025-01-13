import { ChangeDetectionStrategy, Component, HostBinding, HostListener, OnInit, Signal, ViewEncapsulation, inject } from "@angular/core";

import { Observable, combineLatest, filter, map } from "rxjs";
import { switchMap } from "rxjs/operators";
import { toSignal } from "@angular/core/rxjs-interop";

import {
    AbstractEditorElementActionsService,
    AbstractEditorElementSettingsService,
    AbstractEditorSelectionService,
    ELEMENT_ID,
    LZEditorElementComponent,
    TabsItemPageElement,
    TabsPageElement,
    TabsPageElementSettings,
    processSettingValueWithUnit,
} from "@modules/constructor";
import { ElementResolverDirective, TabSelectionDirective, ToggleSelectionDirective } from "@shared-directives";

@Component({
    selector: "lz-tabs-element",
    imports: [ElementResolverDirective, LZEditorElementComponent],
    templateUrl: "./tabs.component.html",
    styleUrls: ["./tabs.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    hostDirectives: [TabSelectionDirective, ToggleSelectionDirective],
})
export class TabsComponent implements OnInit {
    @HostBinding("class.lz-tabs-element")
    public hostClass = true;

    @HostBinding("$.style.min-height")
    @HostListener("$.style.min-height")
    public height$: Observable<string>;

    @HostBinding("$.style.width")
    @HostListener("$.style.width")
    public width$: Observable<string>;

    public readonly ELEMENT_ID = inject(ELEMENT_ID);

    private readonly editorElementActionsService = inject(AbstractEditorElementActionsService);

    private readonly elementSettingsService = inject(AbstractEditorElementSettingsService);

    private readonly elementSelectionService = inject(AbstractEditorSelectionService);

    private settings$: Observable<TabsPageElementSettings> = this.elementSettingsService.selectSettings(this.ELEMENT_ID);

    public element: Signal<TabsPageElement> = toSignal(this.editorElementActionsService.selectElement(this.ELEMENT_ID));

    public items$: Observable<TabsItemPageElement[]> = this.editorElementActionsService.selectElement(this.ELEMENT_ID).pipe(
        filter(item => !!item),
        switchMap((item: TabsPageElement) => {
            return combineLatest(item.children.map(id => this.editorElementActionsService.selectElement(id) as Observable<TabsItemPageElement>));
        }),
    );

    public ngOnInit(): void {
        this.width$ = this.settings$.pipe(map(settings => processSettingValueWithUnit(settings.width)));

        this.height$ = this.settings$.pipe(map(settings => processSettingValueWithUnit(settings.height)));
    }

    public selectTabItem(id?: string): void {
        if (!id) {
            return;
        }

        if (this.element().settings.selectedElement === id) {
            return;
        }
        this.elementSelectionService.updateSelection(id);

        this.elementSettingsService.updateElementSettings({ selectedElement: id }, this.ELEMENT_ID);
    }
}
