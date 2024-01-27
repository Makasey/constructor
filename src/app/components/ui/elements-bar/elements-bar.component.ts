import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output, ViewEncapsulation } from "@angular/core";
import { Page } from "@core";

@Component({
    selector: "lz-elements-bar",
    templateUrl: "./elements-bar.component.html",
    styleUrl: "./elements-bar.component.scss",
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [],
})
export class ElementsBarComponent {
    @HostBinding("class.elements-bar")
    public hostClass = true;

    @Input()
    public items: Page[];

    @Output()
    public readonly addItem: EventEmitter<void> = new EventEmitter<void>();

    @Output()
    public readonly copyItem: EventEmitter<string> = new EventEmitter<string>();

    @Output()
    public readonly deleteItem: EventEmitter<string> = new EventEmitter<string>();

    public add(): void {
        this.addItem.emit();
    }

    public copy(id: string): void {
        this.copyItem.emit(id);
    }

    public delete(id: string): void {
        this.deleteItem.emit(id);
    }
}
