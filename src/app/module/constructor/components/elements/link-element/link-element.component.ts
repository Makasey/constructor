import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";

@Component({
    selector: "lz-link-element",
    templateUrl: "./link-element.component.html",
    styleUrl: "./link-element.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [],
    standalone: true,
    host: {
        class: "lz-link-element",
    },
})
export class LinkElementComponent {}
