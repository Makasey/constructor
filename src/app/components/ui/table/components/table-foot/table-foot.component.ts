import { ChangeDetectionStrategy, Component, HostBinding } from "@angular/core";

@Component({
    selector: "lz-table-foot",
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: "./table-foot.component.html",
    standalone: true,
})
export class LZTableFootComponent {
    @HostBinding("class.table-foot")
    public hostClass = true;
}
