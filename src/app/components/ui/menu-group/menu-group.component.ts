import { ChangeDetectionStrategy, Component, HostBinding, HostListener, Input, TemplateRef, ViewEncapsulation } from "@angular/core";
import { NgFor, NgIf, NgTemplateOutlet } from "@angular/common";
import { OverlayModule } from "@angular/cdk/overlay";
import { RouterLink } from "@angular/router";

@Component({
    selector: "lz-menu-group",
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ["./menu-group.component.scss"],
    encapsulation: ViewEncapsulation.None,
    templateUrl: "./menu-group.component.html",
    imports: [NgFor, OverlayModule, NgIf, RouterLink, NgTemplateOutlet],
})
export class MenuGroupComponent {
    @HostBinding("class.lz-menu-group")
    public readonly hostClass = true;

    @HostListener("mouseenter")
    public onHover(): void {
        this.hovered = true;
    }

    @HostListener("mouseleave")
    public onBlur(): void {
        this.hovered = false;
    }

    public opened = false;

    public hovered = false;

    @Input({ required: true })
    public itemTemplate: TemplateRef<{ item: unknown; }>;

    @Input({ required: true })
    public items: unknown[];

    @Input()
    public triggerLabel: string;

    @Input()
    public triggerTemplate: TemplateRef<unknown>;

    public closeMenuGroup(): void {
        this.opened = false;
        this.hovered = false;
    }

    public openMenuGroup(): void {
        this.opened = true;
    }
}
