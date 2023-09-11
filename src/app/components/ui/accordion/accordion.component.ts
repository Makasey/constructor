import { ChangeDetectionStrategy, Component, ContentChildren, HostBinding, Input, QueryList, ViewEncapsulation } from "@angular/core";
import { CommonModule } from "@angular/common";
import { animate, state, style, transition, trigger } from "@angular/animations";

import { LZAccordionItemDirective } from "@components/ui/accordion/directives/accordion-item.directive";

@Component({
    selector: "lz-accordion",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./accordion.component.html",
    styleUrls: ["./accordion.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger("contentExpansion", [
            state("expanded", style({ height: "*", opacity: 1, visibility: "visible" })),
            state("collapsed", style({ height: "0px", opacity: 0, visibility: "hidden" })),
            transition("expanded <=> collapsed", animate("200ms cubic-bezier(.37,1.04,.68,.98)")),
        ]),
    ],
})
export class AccordionComponent {
    @HostBinding("class.lz-accordion")
    public hostClass = true;

    @Input() public collapsing = true;

    @ContentChildren(LZAccordionItemDirective) public items: QueryList<LZAccordionItemDirective>;

    public toggleState(item: LZAccordionItemDirective): void {
        if (item.disabled) {
            return;
        }

        if (!item.expanded && this.collapsing) {
            this.items.toArray().forEach(item => {
                item.expanded = false;
            });
        }

        item.expanded = !item.expanded;
    }

    public trackByItem(_: number, item: LZAccordionItemDirective): string {
        return item.title;
    }
}
