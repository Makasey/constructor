import { AbstractEditAreaService } from "@modules/constructor/components/edit-area/edit-area.service";
import { AsyncPipe, JsonPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation, inject } from "@angular/core";
import { RootComponent } from "@modules/constructor/components/edit-area/component/root/root.component";

@Component({
    selector: "lz-edit-area",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ["./edit-area.component.scss"],
    standalone: true,
    templateUrl: "./edit-area.component.html",
    imports: [JsonPipe, AsyncPipe, RootComponent],
})
export class EditAreaComponent {
    @HostBinding("class.lz-edit-area")
    public hostClass = true;

    public service = inject(AbstractEditAreaService);

    public selectedElement$ = this.service.selectSelectedElement();
}
