import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from "@angular/core";
import { NgIf } from "@angular/common";

import { toSignal } from "@angular/core/rxjs-interop";

import { APFormModule } from "@components/ui";
import { AbstractEditorElementSettingsService } from "@modules/constructor/core/abstract/editor-element-settings.service";
import { AccordionComponent } from "@components/ui/accordion";
import { AccordionContentDirective } from "@components/ui/accordion/directives/accordion-content.directive";
import { AccordionItemDirective } from "@components/ui/accordion/directives/accordion-item.directive";

@Component({
    selector: "lz-element-settings",
    templateUrl: "./element-settings.component.html",
    styleUrls: ["./element-settings.component.scss"],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [APFormModule, NgIf, AccordionComponent, AccordionItemDirective, AccordionContentDirective],
})
export class ElementSettingsComponent {
    private readonly service = inject(AbstractEditorElementSettingsService);

    public readonly elementSettingsFormModel = toSignal(this.service.selectElementSettingsFormModel());

    public readonly selectElementSettingsFormModelChange = toSignal(this.service.selectElementSettingsFormModelChange());
}
