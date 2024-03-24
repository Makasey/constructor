import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation, inject, signal } from "@angular/core";
import { EDITOR_SELECTED_ELEMENT, ELEMENT_ID } from "@modules/constructor";

@Component({
    selector: "lz-element-actions",
    templateUrl: "./element-actions.component.html",
    styleUrl: "./element-actions.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [],
})
export class ElementActionsComponent {
    @HostBinding("class.element-actions")
    public hostClass = true;

    public configItems = signal<unknown[]>([]);

    public elementId = inject(ELEMENT_ID);

    public selectedElement$ = inject(EDITOR_SELECTED_ELEMENT);

    @Input() public config: any;

    // constructor() {
    //     console.log(this.elementId, this.selectedElement$.subscribe(console.log));
    // }
    //
    // public getElementConfig(): void {
    //     this.configItems.set(this.editorActionsService.processElementActions(this.elementId));
    // }
}
