import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "app-orders",
    templateUrl: "./orders.component.html",
    styleUrls: ["./orders.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersComponent {}
