import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "app-notifiations",
    templateUrl: "./notifiations.component.html",
    styleUrls: ["./notifiations.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotifiationsComponent {}
