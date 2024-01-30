import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output, ViewEncapsulation } from "@angular/core";
import { Page } from "@core";

@Component({
    selector: "lz-pages-bar",
    templateUrl: "./pages-bar.component.html",
    styleUrl: "./pages-bar.component.scss",
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [],
})
export class PagesBarComponent {
    @HostBinding("class.pages-bar")
    public hostClass = true;

    @Input()
    public items: Page[];

    @Output()
    public readonly addItem: EventEmitter<void> = new EventEmitter<void>();

    @Output()
    public readonly copyItem: EventEmitter<string> = new EventEmitter<string>();

    @Output()
    public readonly deleteItem: EventEmitter<string> = new EventEmitter<string>();

    @Output()
    public readonly selectPage: EventEmitter<string> = new EventEmitter<string>();

    public add(): void {
        this.addItem.emit();
    }

    public copy(id: string): void {
        this.copyItem.emit(id);
    }

    public delete(id: string): void {
        this.deleteItem.emit(id);
    }

    public select(id: string): void {
        this.selectPage.emit(id);
    }
}
