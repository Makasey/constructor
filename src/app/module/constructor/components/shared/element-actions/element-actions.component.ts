import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from "@angular/core";

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

    @Input() public config: any;
}
