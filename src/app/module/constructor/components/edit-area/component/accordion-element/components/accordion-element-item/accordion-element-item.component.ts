import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
    selector: "lz-accordion-element-item",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./accordion-element-item.component.html",
    styleUrl: "./accordion-element-item.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class AccordionElementItemComponent {}
