import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "app-delivery",
    templateUrl: "./delivery.component.html",
    styleUrls: ["./delivery.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeliveryComponent {}
