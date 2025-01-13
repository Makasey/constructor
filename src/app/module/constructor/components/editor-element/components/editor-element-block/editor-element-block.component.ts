import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from "@angular/core";
import { ElementResolverDirective } from "@shared-directives";

@Component({
    selector: "lz-editor-element-block",
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    providers: [],
    imports: [ElementResolverDirective],
    templateUrl: "./editor-element-block.component.html",
    styleUrl: "./editor-element-block.component.scss",
})
export class LZEditorElementBlockComponent {
    public readonly elementID = input.required<string>();

    public readonly parentID = input.required<string>();
}
