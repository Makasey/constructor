import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "app-home-inner",
    templateUrl: "./home-inner.component.html",
    styleUrls: ["./home.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeInnerComponent {}
