import { ChangeDetectionStrategy, Component, HostBinding, TemplateRef, ViewChild, ViewEncapsulation } from "@angular/core";

import { Subject } from "rxjs";

import { HostModalContentDirective } from "./host-modal-content.directive";
import { ModalConfig } from "./types";

@Component({
    selector: "ap-modal",
    templateUrl: "./modal.component.html",
    styleUrls: ["./modal.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
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

    @HostBinding("class")
    public get hostClass(): string {
        return this.config.customClass ?? "";
    }

    public text: string;

    public closeModal(): void {
        if (!this.config.closeOnOutsideClick) {
            return;
        }

        this.closeSubject$.next();
        this.closeSubject$.complete();
    }

    public stopEventPropagation(event: Event): void {
        event.stopPropagation();
    }
}
