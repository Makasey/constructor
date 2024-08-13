import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "lz-saved-elements",
    templateUrl: "./saved-elements.component.html",
    styleUrl: "./saved-elements.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [],
})
export class SavedElementsComponent {}
