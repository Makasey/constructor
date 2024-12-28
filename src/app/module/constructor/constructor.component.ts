import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { EDITOR_PROVIDERS } from "@modules/constructor";
import { LZToastrComponent } from "@components";

@Component({
    selector: "lz-constructor",
    templateUrl: "./constructor.component.html",
    styleUrls: ["./constructor.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [RouterOutlet, LZToastrComponent],
    providers: [...EDITOR_PROVIDERS],
})
export class LZConstructorComponent {
    @HostBinding("class.lz-constructor")
    public hostClass = true;
}
