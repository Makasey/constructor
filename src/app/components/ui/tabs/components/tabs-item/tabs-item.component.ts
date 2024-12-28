import { ChangeDetectionStrategy, Component, TemplateRef, ViewEncapsulation, input } from "@angular/core";

@Component({
    selector: "lz-tabs-item",
    templateUrl: "./tabs-item.component.html",
    styleUrls: ["./tabs-item.component.scss"],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class TabsItemComponent {
    public readonly title = input.required<string>();

    public readonly customClass = input<string>();

    public readonly template = input.required<TemplateRef<unknown>>();
}
