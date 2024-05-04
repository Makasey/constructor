import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from "@angular/core";
import { NgIf } from "@angular/common";

import { toSignal } from "@angular/core/rxjs-interop";

import { APFormComponent, AccordionComponent, LZAccordionContentDirective, LZAccordionItemDirective } from "@components";
import { AbstractEditorElementSettingsService } from "@modules/constructor";

@Component({
    selector: "lz-element-settings",
    templateUrl: "./element-settings.component.html",
    styleUrls: ["./element-settings.component.scss"],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [APFormComponent, NgIf, AccordionComponent, LZAccordionItemDirective, LZAccordionContentDirective],
})
export class ElementSettingsComponent {
    private readonly service = inject(AbstractEditorElementSettingsService);

    public readonly elementSettingsFormModel = toSignal(this.service.selectElementSettingsFormModel());

    public updateElementSettings(settings: unknown, mapperFn: <T, V>(data: T) => V): void {
        const processedSettings = mapperFn ? mapperFn(settings) : this.defaultMapper(settings);

        this.service.updateElementSettings(processedSettings);
    }

    private defaultMapper(data: unknown): unknown {
        return data;
    }
}
