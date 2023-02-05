import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { StatusType } from "./types";

@Component({
    selector: "lz-status",
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: "./status.component.html",
    styleUrls: ["./status.component.scss"],
})
export class StatusComponent {
    @Input()
    public status: unknown;

    public statusTypes = StatusType;

    public statusTypeClasses: Record<StatusType, string> = {
        [StatusType.WAIT]: "wait",
        [StatusType.CANCEL]: "cancel",
        [StatusType.PAID]: "paid",
    };
}
