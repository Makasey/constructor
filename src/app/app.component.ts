import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { LZToastrComponent } from "@components/ui";

@Component({
    selector: "app-root",
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: "./app.component.html",
    imports: [LZToastrComponent, RouterOutlet],
    styleUrls: ["./app.component.scss"]
})
export class AppComponent {}
