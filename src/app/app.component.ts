import { ChangeDetectionStrategy, Component } from "@angular/core";
import { LZToastrModule } from "@components/ui";

@Component({
    selector: "app-root",
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: "./app.component.html",
    standalone: true,
    imports: [LZToastrModule.forRoot()],
    styleUrls: ["./app.component.scss"],
})
export class AppComponent {}
