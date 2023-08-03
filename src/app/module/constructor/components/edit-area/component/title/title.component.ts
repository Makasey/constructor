import { AbstractEditAreaService } from "@modules/constructor/components/edit-area/edit-area.service";
import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from "@angular/core";
import { ELEMENT_ID } from "@modules/constructor/components/edit-area/types";
import { JsonPipe } from "@angular/common";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
    selector: "lz-title-element",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    template: "TITLE: {{item() | json}} <ng-template #container />",
    imports: [JsonPipe],
})
export class TitleComponent {
    private readonly service = inject(AbstractEditAreaService);

    private readonly elementID = inject(ELEMENT_ID) as number;

    public readonly item = toSignal(this.service.selectElement(this.elementID));
}
