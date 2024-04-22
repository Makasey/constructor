import { ChangeDetectionStrategy, Component } from "@angular/core";
import { LZToastrModule } from "@components/ui";
import { RouterOutlet } from "@angular/router";

@Component({
    selector: "app-root",
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: "./app.component.html",
    standalone: true,
    imports: [LZToastrModule, RouterOutlet],
    styleUrls: ["./app.component.scss"],
})
export class AppComponent {}
