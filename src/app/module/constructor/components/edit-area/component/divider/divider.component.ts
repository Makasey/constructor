import { AbstractEditorElementSettingsService, ELEMENT_ID, SectionPageElementSettings } from "@modules/constructor";
import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Observable } from "rxjs";
import { TabSelectionDirective, ToggleSelectionDirective } from "@shared-directives";

@Component({
    selector: "lz-divider",
    templateUrl: "./divider.component.html",
    styleUrl: "./divider.component.scss",
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    hostDirectives: [TabSelectionDirective, ToggleSelectionDirective],
    imports: [CommonModule],
})
export class DividerComponent {
    private readonly ELEMENT_ID = inject(ELEMENT_ID);

    private readonly abstractEditorElementSettingsService = inject(AbstractEditorElementSettingsService);

    private readonly dividerSettings$: Observable<SectionPageElementSettings> = this.abstractEditorElementSettingsService.selectSettings(
        this.ELEMENT_ID,
    );
}
