import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "app-addresses",
    templateUrl: "./addresses.component.html",
    styleUrls: ["./addresses.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressesComponent {}
