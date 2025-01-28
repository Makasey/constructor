import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation, inject } from "@angular/core";

import {
    AbstractEditorElementSettingsService,
    AbstractEditorSelectionService,
    ELEMENT_ID,
    LZEditorElementComponent,
    TabsPageElement,
    processSettingValueWithUnit,
} from "@modules/constructor";
import { BaseElementAbstract } from "@modules/constructor/components/elements/base-element/base-element.abstract";
import { ElementResolverDirective, TabSelectionDirective, ToggleSelectionDirective } from "@shared-directives";
import { hostBinding } from "@modules/constructor/utils/host-binding";

@Component({
    selector: "lz-tabs-element",
    imports: [ElementResolverDirective, LZEditorElementComponent],
    templateUrl: "./tabs.component.html",
    styleUrls: ["./tabs.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    hostDirectives: [TabSelectionDirective, ToggleSelectionDirective],
    standalone: true,
    host: {
        class: "lz-tabs-element",
    },
})
export class TabsComponent extends BaseElementAbstract<TabsPageElement> implements OnInit {
    public readonly ELEMENT_ID = inject(ELEMENT_ID);

    private readonly elementSettingsService = inject(AbstractEditorElementSettingsService);

    private readonly elementSelectionService = inject(AbstractEditorSelectionService);

    public ngOnInit(): void {
        hostBinding(this.selectSlice("height", processSettingValueWithUnit), "style.min-height", this.injector);

        hostBinding(this.selectSlice("width", processSettingValueWithUnit), "style.width", this.injector);
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
