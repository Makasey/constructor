import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild } from "@angular/core";
import { HostModalContentDirective } from "./host-modal-content.directive";
import { ModalConfig } from "./types";
import { Subject } from "rxjs";

@Component({
    selector: "ap-modal",
    templateUrl: "./modal.component.html",
    styleUrls: ["./modal.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
    public config: ModalConfig;

    public closeSubject$: Subject<void> = new Subject<void>();

    @ViewChild(HostModalContentDirective, {
        static: true,
    })
    public hostView: HostModalContentDirective;

    @ViewChild("defaultContent", {
        static: true,
    })
    public defaultContent: TemplateRef<unknown>;

    public text: string;

    public closeModal(): void {
        this.closeSubject$.next();
    }

    public stopEventPropagation(event: Event): void {
        event.stopPropagation();
    }
}
