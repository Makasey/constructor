import { ChangeDetectionStrategy, Component, Input, ViewChild, ViewContainerRef, ViewEncapsulation, inject } from "@angular/core";
import { ComponentWithVCR } from "@modules/constructor/components/edit-area/types";
import { JsonPipe } from "@angular/common";

@Component({
    selector: "lz-title-element",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    template: "TITLE: {{item | json}} <ng-template #container />",
    imports: [JsonPipe],
})
export class TitleComponent implements ComponentWithVCR {
    public readonly viewContainerRef = inject(ViewContainerRef);

    @Input({ required: true })
    public item: unknown;

    @ViewChild("container", { static: true, read: ViewContainerRef })
    public readonly container: ViewContainerRef;
}
