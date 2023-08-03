import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
    selector: "lz-page",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ["./page.component.scss"],
    standalone: true,
    templateUrl: "./page.component.html",
    imports: [RouterOutlet],
})
export class PageComponent {
    @HostBinding("class.lz-page")
    public hostClass = true;
}
