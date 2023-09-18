import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation, inject } from "@angular/core";

import { toSignal } from "@angular/core/rxjs-interop";

import { APFormModel, APFormModule } from "@components/ui";
import { AbstractEditorPageSettingsService } from "@modules/constructor/core/abstract/editor-page-settings.service";

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
    @HostBinding("class.lz-site-settings")
    public hostClass = true;

    private readonly service = inject(AbstractEditorPageSettingsService);

    public readonly formModel = toSignal(this.service.selectFormModel(), {
        initialValue: {} as APFormModel,
    });

    public readonly formModelChanges = toSignal(this.service.selectFormModelChange());
}
