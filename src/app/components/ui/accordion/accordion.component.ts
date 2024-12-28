import { AsyncPipe, NgTemplateOutlet } from "@angular/common";
import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation, contentChildren, input } from "@angular/core";
import { animate, state, style, transition, trigger } from "@angular/animations";

import { LZAccordionItemDirective } from "@components";
import { Observable } from "rxjs";
import { toObservable } from "@angular/core/rxjs-interop";

@Component({
    selector: "lz-accordion",
    templateUrl: "./accordion.component.html",
    styleUrls: ["./accordion.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [AsyncPipe, NgTemplateOutlet],
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

    public readonly items = contentChildren(LZAccordionItemDirective);

    public readonly collapsing = input(true);

    public itemsChanges$: Observable<readonly LZAccordionItemDirective[]> = toObservable(this.items);

    public toggleState(item: LZAccordionItemDirective): void {
        if (item.disabled()) {
            return;
        }

        const expanded = item.expanded;
        if (!expanded && this.collapsing()) {
            this.items().forEach(item => {
                item.expanded = false;
            });
        }

        item.expanded = !expanded;
    }
}
