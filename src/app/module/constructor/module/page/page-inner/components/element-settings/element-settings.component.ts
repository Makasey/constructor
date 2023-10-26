import { AsyncPipe, NgForOf, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from "@angular/core";

import { toSignal } from "@angular/core/rxjs-interop";

import { APFormModel, APFormModule, AccordionComponent, LZAccordionContentDirective, LZAccordionItemDirective } from "@components";
import { AbstractEditorElementSettingsService } from "@modules/constructor";

@Component({
    selector: "lz-element-settings",
    templateUrl: "./element-settings.component.html",
    styleUrls: ["./element-settings.component.scss"],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [APFormModule, NgIf, AccordionComponent, LZAccordionItemDirective, LZAccordionContentDirective, NgForOf, AsyncPipe],
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

    public trackByGroup(_: number, group: APFormModel): string {
        return group.id;
    }
}
