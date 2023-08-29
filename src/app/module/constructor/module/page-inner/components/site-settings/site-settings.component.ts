import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from "@angular/core";

import { toSignal } from "@angular/core/rxjs-interop";

import { APFormModel, APFormModule } from "@components/ui";
import { AbstractEditAreaService } from "@modules/constructor/components/edit-area/edit-area.service";

@Component({
    selector: "lz-site-settings",
    standalone: true,
    templateUrl: "./site-settings.component.html",
    styleUrls: ["./site-settings.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [APFormModule],
})
export class SiteSettingsComponent {
    private readonly service = inject(AbstractEditAreaService);

    public readonly formModel = toSignal(this.service.selectFormModel(), {
        initialValue: {} as APFormModel,
    });

    public readonly formModelChanges = toSignal(this.service.selectFormModelChange());
}
