import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "app-sales",
    templateUrl: "./sales.component.html",
    styleUrls: ["./sales.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SalesComponent {}
