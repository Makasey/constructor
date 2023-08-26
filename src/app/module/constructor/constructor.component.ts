import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from "@angular/core";
import { EDITOR_PROVIDERS } from "@modules/constructor/providers/providers";
import { LZToastrModule } from "@components/ui";
import { RouterOutlet } from "@angular/router";

@Component({
    selector: "lz-constructor",
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    templateUrl: "./constructor.component.html",
    styleUrls: ["./constructor.component.scss"],
    imports: [RouterOutlet, LZToastrModule],
    providers: EDITOR_PROVIDERS,
})
export class LZConstructorComponent {
    @HostBinding("class.lz-constructor")
    public hostClass = true;
}
