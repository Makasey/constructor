import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from "@angular/core";

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

    @Input() public items: unknown[] = [1, 2, 3];
}
