import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from "@angular/core";
import { NgIf } from "@angular/common";

import { toSignal } from "@angular/core/rxjs-interop";

import { APFormModule } from "@components/ui";
import { AbstractEditorElementSettingsService } from "@modules/constructor/core/abstract/editor-element-settings.service";

@Component({
    selector: "lz-element-settings",
    templateUrl: "./element-settings.component.html",
    styleUrls: ["./element-settings.component.scss"],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [APFormModule, NgIf],
})
export class ElementSettingsComponent {
    private readonly service = inject(AbstractEditorElementSettingsService);

    public readonly elementSettingsFormModel = toSignal(this.service.selectElementSettingsFormModel());

    public readonly selectElementSettingsFormModelChange = toSignal(this.service.selectElementSettingsFormModelChange());
}
