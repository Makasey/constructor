import { AsyncPipe, JsonPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation, inject } from "@angular/core";
import { EDITOR_SELECTED_ELEMENT, RootComponent } from "@modules/constructor";
import { ElementsBarComponent } from "@components";

@Component({
    selector: "lz-edit-area",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ["./edit-area.component.scss"],
    standalone: true,
    templateUrl: "./edit-area.component.html",
    imports: [JsonPipe, AsyncPipe, RootComponent, ElementsBarComponent],
})
export class EditAreaComponent {
    @HostBinding("class.lz-edit-area")
    public hostClass = true;

    public selectedElement$ = inject(EDITOR_SELECTED_ELEMENT);
}
