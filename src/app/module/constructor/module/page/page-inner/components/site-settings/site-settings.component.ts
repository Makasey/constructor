import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation, inject } from "@angular/core";

import { toSignal } from "@angular/core/rxjs-interop";

import { APFormModel, APFormComponent, APTextFieldModule } from "@components";
import { AbstractEditorPageSettingsService } from "@modules/constructor";
import { FormsModule } from "@angular/forms";

@Component({
    selector: "lz-site-settings",
    standalone: true,
    templateUrl: "./site-settings.component.html",
    styleUrls: ["./site-settings.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [APFormComponent, APTextFieldModule, FormsModule],
})
export class SiteSettingsComponent {
    @HostBinding("class.lz-site-settings")
    public hostClass = true;

    private readonly service = inject(AbstractEditorPageSettingsService);

    public readonly formModel = toSignal(this.service.selectFormModel(), {
        initialValue: {} as APFormModel,
    });

    public readonly campaignName = toSignal(this.service.selectCampaignName());

    public readonly formModelChanges = toSignal(this.service.selectFormModelChange());

    public updateCampaignName(campaignName: string): void {
        this.service.updateCampaignName(campaignName);
    }
}
