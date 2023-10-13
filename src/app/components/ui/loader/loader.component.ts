import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from "@angular/core";

@Component({
    selector: "lz-loader",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [],
    encapsulation: ViewEncapsulation.None,
    styleUrls: ["./loader.component.scss"],
    templateUrl: "./loader.component.html",
})
export class LZLoaderComponent {
    @HostBinding("class.lz-loader")
    public hostClass = true;

    @HostBinding("class")
    @Input()
    public customClass = "test";
}
