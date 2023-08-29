import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from "@angular/core";

import { toSignal } from "@angular/core/rxjs-interop";

import { APFormModel, APFormModule } from "@components/ui";
import { AbstractEditAreaService } from "@modules/constructor/components/edit-area/edit-area.service";

@Component({
    selector: "lz-element-settings",
    templateUrl: "./element-settings.component.html",
    styleUrls: ["./element-settings.component.scss"],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [APFormModule],
})
export class ElementSettingsComponent {
    private readonly service = inject(AbstractEditAreaService);

    public readonly elementSettingsFormModel = toSignal(this.service.selectElementSettingsFormModel(), {
        initialValue: {} as APFormModel,
    });

    public readonly selectElementSettingsFormModelChange = toSignal(this.service.selectElementSettingsFormModelChange());
}
