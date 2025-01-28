import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation, inject } from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";

import {
    AbstractEditorElementActionsService,
    AbstractEditorSelectionService,
    AbstractSectionEditorActionsService,
    ColumnStructure,
    Directions,
    ELEMENT_ID,
    SECTION_PROVIDERS,
    SectionPageElement,
    SectionSelectionService,
    columnStructureElements,
    processBorderSideData,
    processDirectionValue,
    processSettingValueWithUnit,
} from "@modules/constructor";

import { BaseElementAbstract } from "@modules/constructor/components/elements/base-element/base-element.abstract";
import { ImageLinkPipe } from "@shared-pipes";
import { LZEditorElementFlexComponent } from "@modules/constructor/components/editor-element/components/editor-element-flex/editor-element-flex.component";
import { TabSelectionDirective, ToggleSelectionDirective } from "@shared-directives";
import { hostBinding } from "@modules/constructor/utils/host-binding";

@Component({
    selector: "lz-section-element",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    templateUrl: `./section.component.html`,
    styleUrls: ["./section.component.scss"],
    hostDirectives: [TabSelectionDirective, ToggleSelectionDirective],
    providers: [...SECTION_PROVIDERS],
    imports: [ImageLinkPipe, NgTemplateOutlet, LZEditorElementFlexComponent],
    standalone: true,
    host: {
        "[attr.id]": "ELEMENT_ID",
        "[class.editor-element]": "true",
        "[class.lz-section-element]": "true",
    },
})
export class SectionComponent extends BaseElementAbstract<SectionPageElement> implements OnInit {
    private readonly editorActionsService = inject(AbstractEditorElementActionsService) as AbstractSectionEditorActionsService;
    private readonly selectionService = inject(AbstractEditorSelectionService) as SectionSelectionService;
    public readonly ELEMENT_ID = inject(ELEMENT_ID);

    public readonly columnStructureElement = ColumnStructure;

    public readonly columnStructureElements = columnStructureElements;

    public ngOnInit(): void {
        hostBinding(this.selectSlice("height", processSettingValueWithUnit), "style.min-height", this.injector);

        hostBinding(this.selectSlice("width", processSettingValueWithUnit), "style.width", this.injector);

        hostBinding(this.selectSlice("margin", processDirectionValue), "style.margin", this.injector);

        hostBinding(this.selectSlice("padding", processDirectionValue), "style.padding", this.injector);

        hostBinding(this.selectSlice("color"), "style.color", this.injector);

        hostBinding(this.selectSlice("letterSpacing", processSettingValueWithUnit), "style.letter-spacing", this.injector);

        hostBinding(this.selectSlice("opacity"), "style.opacity", this.injector);

        hostBinding(this.selectSlice("background"), "style.background", this.injector);

        hostBinding(this.selectSlice("gap", processSettingValueWithUnit), "style.gap", this.injector);

        hostBinding(this.selectSlice("justifyContent"), "style.justify-content", this.injector);

        hostBinding(this.selectSlice("flexWrap"), "style.flex-wrap", this.injector);

        hostBinding(this.selectSlice("alignItems"), "style.align-items", this.injector);

        hostBinding(
            this.selectSlice("border", border => processDirectionValue(border.borderRadius)),
            "style.border-radius",
            this.injector,
        );

        hostBinding(
            this.selectSlice("border", border => processBorderSideData(border, Directions.LEFT)),
            "style.border-left",
            this.injector,
        );
        hostBinding(
            this.selectSlice("border", border => processBorderSideData(border, Directions.RIGHT)),
            "style.border-right",
            this.injector,
        );
        hostBinding(
            this.selectSlice("border", border => processBorderSideData(border, Directions.TOP)),
            "style.border-top",
            this.injector,
        );
        hostBinding(
            this.selectSlice("border", border => processBorderSideData(border, Directions.BOTTOM)),
            "style.border-bottom",
            this.injector,
        );
    }

    public chooseStructure(type: ColumnStructure): void {
        this.selectionService.updateSectionSelection(this.ELEMENT_ID);
        this.editorActionsService.chooseColumnStructureType(this.ELEMENT_ID, type);
    }

    public selectElement(): void {
        this.selectionService.updateSectionSelection(this.ELEMENT_ID);
    }
}
