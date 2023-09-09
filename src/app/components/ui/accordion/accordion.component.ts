import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    HostBinding,
    Input,
    QueryList,
    ViewEncapsulation,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { map, merge, of } from "rxjs";

import { AccordionItemDirective } from "@components/ui/accordion/directives/accordion-item.directive";
import { TogglePipe } from "@components/ui/accordion/pipe/toggle.pipe";

@Component({
    selector: "lz-accordion",
    standalone: true,
    imports: [CommonModule, TogglePipe],
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

    @ContentChildren(AccordionItemDirective) public items: QueryList<AccordionItemDirective>;

    public expanded = new Set<number>();

    constructor(private readonly cdr: ChangeDetectorRef) {}

    public ngAfterViewInit(): void {
        merge(this.items.changes, of(this.items))
            .pipe(map(() => this.items.toArray()))
            .subscribe(items => {
                items.forEach((item, index) => {
                    if (item.expanded) {
                        this.expanded.add(index);
                    }
                });
                this.cdr.detectChanges();
            });
    }

    public toggleState = (index: number): void => {
        if (this.expanded.has(index)) {
            this.expanded.delete(index);
        } else {
            if (this.collapsing) {
                this.expanded.clear();
            }
            this.expanded.add(index);
        }
    };
}
