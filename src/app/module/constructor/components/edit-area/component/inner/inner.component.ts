import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ELEMENT_ID, InnerPageElement } from "@modules/constructor";
import { ElementResolverDirective } from "@shared-directives";
import { Observable } from "rxjs";

@Component({
    selector: "lz-inner",
    templateUrl: "./inner.component.html",
    styleUrls: ["./inner.component.scss"],
    standalone: true,
    imports: [CommonModule, ElementResolverDirective],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InnerComponent {
    public element$: Observable<InnerPageElement> = new Observable();

    public readonly ELEMENT_ID = inject(ELEMENT_ID);

    public _trackBy(index: number, item: number): number {
        return item;
    }
}
