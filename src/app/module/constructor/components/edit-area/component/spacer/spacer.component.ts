import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
    selector: "lz-spacer",
    templateUrl: "./spacer.component.html",
    styleUrl: "./spacer.component.scss",
    standalone: true,
    imports: [CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class SpacerComponent {
    @HostBinding("class.lz-spacer")
    public hostClass = true;
}
