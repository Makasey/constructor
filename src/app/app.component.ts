import { ChangeDetectionStrategy, Component } from "@angular/core";
import {FormControl} from "@angular/forms";
import { LZDay } from "./components/ui/calendar/classes";

@Component({
    selector: "app-root",
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent {
    public day = new LZDay(2023, 0, 12);

    public dateControl = new FormControl(LZDay.currentLocal());

    public onValueChange(value: LZDay): void {
        console.log(value);
    }
}
