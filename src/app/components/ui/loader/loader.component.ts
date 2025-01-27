import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from "@angular/core";

@Component({
    selector: "lz-loader",
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [],
    encapsulation: ViewEncapsulation.None,
    styleUrls: ["./loader.component.scss"],
    templateUrl: "./loader.component.html",
})
export class LZLoaderComponent {
    @HostBinding("class.lz-loader")
    public hostClass = true;

    @Input()
    @HostBinding("class")
    public readonly customClass = "test";
}
