import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EditAreaComponent } from "@modules/constructor/components/edit-area/edit-area.component";

@Component({
    selector: "lz-page-inner",
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    imports: [CommonModule, EditAreaComponent],
    templateUrl: "./page-inner.component.html",
    styleUrls: ["./page-inner.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageInnerComponent {
    @HostBinding("class.lz-page-inner")
    public hostClass = true;
}
