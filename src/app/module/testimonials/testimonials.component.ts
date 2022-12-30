import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "app-testimonials",
    templateUrl: "./testimonials.component.html",
    styleUrls: ["./testimonials.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestimonialsComponent {}
