import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation, input } from "@angular/core";

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

    @HostBinding("class")
    public readonly customClass = input("test");
}
