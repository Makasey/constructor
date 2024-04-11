import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from "@angular/core";
import { LZToastrModule } from "@components";
import { RouterOutlet } from "@angular/router";

import { EDITOR_PROVIDERS } from "@modules/constructor";

@Component({
    selector: "lz-constructor",
    templateUrl: "./constructor.component.html",
    styleUrls: ["./constructor.component.scss"],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [RouterOutlet, LZToastrModule],
    providers: [...EDITOR_PROVIDERS],
})
export class LZConstructorComponent {
    @HostBinding("class.lz-constructor")
    public hostClass = true;
}
