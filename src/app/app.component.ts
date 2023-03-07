import { ChangeDetectionStrategy, Component } from "@angular/core";

import { LZDay } from "./components";

@Component({
    selector: "app-root",
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent {
    public day = new LZDay(2023, 0, 12);

    public onValueChange(value: LZDay): void {
        console.log(value);
    }
}
