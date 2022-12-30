import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "app-person",
    templateUrl: "./person.component.html",
    styleUrls: ["./person.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonComponent {}
