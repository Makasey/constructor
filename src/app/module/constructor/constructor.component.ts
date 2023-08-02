import { AbstractEditAreaService, DefaultEditAreaService } from "@modules/constructor/components/edit-area/edit-area.service";
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";
import { LzStateKey } from "@core/store/lz.state";
import { RouterOutlet } from "@angular/router";
import { createStoreProviders } from "@core/store/abstract/create-store-providers";

@Component({
    selector: "lz-constructor",
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    templateUrl: "./constructor.component.html",
    styleUrls: ["./constructor.component.scss"],
    imports: [RouterOutlet],
    providers: [...createStoreProviders(LzStateKey.EDITOR_STATE), { provide: AbstractEditAreaService, useClass: DefaultEditAreaService }],
})
export class LZConstructorComponent {}
