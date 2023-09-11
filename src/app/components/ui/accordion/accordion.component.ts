import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChildren, HostBinding, Input, QueryList, ViewEncapsulation } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Observable, map, merge, of, tap } from "rxjs";
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
export class AccordionComponent implements AfterViewInit {
    @HostBinding("class.lz-accordion")
    public hostClass = true;

    @Input() public collapsing = true;

    @ContentChildren(LZAccordionItemDirective) public items: QueryList<LZAccordionItemDirective>;

    public expanded = new Set<number>();

    public expandedItems$: Observable<LZAccordionItemDirective[]>;

    public ngAfterViewInit(): void {
        this.expandedItems$ = merge(this.items.changes, of(this.items)).pipe(
            map(() => this.items.toArray()),
            tap(items => {
                items.forEach((item, index) => {
                    if (item.expanded) {
                        this.expanded.add(index);
                    }
                });
            }),
        );
    }

    public toggleState(index: number, item: LZAccordionItemDirective): void {
        if (item.disabled) {
            return;
        }

        if (this.expanded.has(index)) {
            this.expanded.delete(index);
        } else {
            this.collapsing && this.expanded.clear();

            this.expanded.add(index);
        }
    }
}
