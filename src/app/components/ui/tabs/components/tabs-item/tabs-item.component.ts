import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewEncapsulation } from "@angular/core";

@Component({
    selector: "lz-tabs-item",
    templateUrl: "./tabs-item.component.html",
    styleUrls: ["./tabs-item.component.scss"],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class TabsItemComponent {
    @Input({ required: true })
    public title: string;

    @Input({ required: true })
    public template: TemplateRef<unknown>;
}
