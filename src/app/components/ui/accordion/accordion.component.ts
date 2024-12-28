import { AfterViewInit, ChangeDetectionStrategy, Component, HostBinding, QueryList, ViewEncapsulation, input, contentChildren } from "@angular/core";
import { AsyncPipe, NgTemplateOutlet } from "@angular/common";
import { animate, state, style, transition, trigger } from "@angular/animations";

import { LZAccordionItemDirective } from "@components";
import { Observable } from "rxjs";

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
    ]
})
export class AccordionComponent implements AfterViewInit {
    @HostBinding("class.lz-accordion")
    public hostClass = true;

    public itemsChanges$: Observable<QueryList<LZAccordionItemDirective>>;

    public readonly collapsing = input(true);

    readonly items = contentChildren(LZAccordionItemDirective);

    public ngAfterViewInit(): void {
        this.itemsChanges$ = this.items().changes;
    }

    public toggleState(item: LZAccordionItemDirective): void {
        if (item.disabled()) {
            return;
        }

        const expanded = item.expanded();
        if (!expanded && this.collapsing()) {
            this.items().forEach(item => {
                item.expanded = false;
            });
        }

        item.expanded = !expanded;
    }
}
