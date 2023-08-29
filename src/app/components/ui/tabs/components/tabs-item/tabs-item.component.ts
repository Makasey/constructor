import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from "@angular/core";

@Component({
    selector: "lz-tabs-item",
    templateUrl: "./tabs-item.component.html",
    styleUrls: ["./tabs-item.component.scss"],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class TabsItemComponent {
    @HostBinding("class.lz-tabs-item")
    public hostClass = true;
}
