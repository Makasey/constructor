import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { EditAreaComponent } from "@modules/constructor/components/edit-area/edit-area.component";

@Component({
    selector: "lz-page-inner",
    standalone: true,
    imports: [CommonModule, EditAreaComponent],
    templateUrl: "./page-inner.component.html",
    styleUrls: ["./page-inner.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageInnerComponent {}
