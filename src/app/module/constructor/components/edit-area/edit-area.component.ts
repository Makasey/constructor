import { AsyncPipe, JsonPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";
import { LZEditAreaItemComponent } from "@modules/constructor/components/edit-area/component/edit-area-item.component";

@Component({
    selector: "lz-edit-area",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ["./edit-area.component.scss"],
    standalone: true,
    templateUrl: "./edit-area.component.html",
    imports: [JsonPipe, AsyncPipe, LZEditAreaItemComponent],
})
export class EditAreaComponent {}
