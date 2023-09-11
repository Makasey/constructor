import { ChangeDetectionStrategy, Component, HostBinding } from "@angular/core";

@Component({
    selector: "lz-table-foot",
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: "./table-foot.component.html",
})
export class TableFootComponent {
    @HostBinding("class.table-foot")
    public hostClass = true;
}
