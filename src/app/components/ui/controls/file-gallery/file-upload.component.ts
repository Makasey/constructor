import { APFormControl, ModalService, ModalType } from "@components";
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    HostBinding,
    Injector,
    Input,
    Output,
    ViewContainerRef,
    ViewEncapsulation,
    forwardRef,
    inject,
} from "@angular/core";
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from "@angular/forms";
import { File } from "@shared-types";
import { FileGalleryComponent } from "@components";
import { NgTemplateOutlet } from "@angular/common";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { filter, tap } from "rxjs";

@UntilDestroy()
@Component({
    selector: "lz-file-upload",
    encapsulation: ViewEncapsulation.None,
    styleUrls: ["./file-upload.component.scss"],
    templateUrl: "./file-upload.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => ESFileUploadComponent),
        },
    ],
    imports: [NgTemplateOutlet],
})
export class ESFileUploadComponent implements ControlValueAccessor {
    @HostBinding("class.lz-file-upload")
    public hostClass = true;

    @Input({ required: true })
    public nativeControl: FormControl;

    @Input({ required: true })
    public controlModel: APFormControl;

    @Output()
    public readonly onValueChange: EventEmitter<File> = new EventEmitter<File>();

    private readonly changeDetectorRef = inject(ChangeDetectorRef);

    private readonly modalService = inject(ModalService);

    private readonly injector = inject(Injector);

    private readonly viewContainerRef = inject(ViewContainerRef);

    public onChangeHandler: (value: File) => void = () => undefined;

    public disabled = false;

    public value: File;

    public onTouchHandler: () => void = () => undefined;

    public registerOnChange(fn: (value: File) => void): void {
        this.onChangeHandler = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this.onTouchHandler = fn;
    }

    public setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    public writeValue(file: File): void {
        this.value = file;
    }

    public openModal(): void {
        this.modalService
            .openModal({
                id: "fileGallery",
                title: "Галерея",
                customClass: "lz-file-gallery-modal full-size",
                data: this.value,
                closable: true,
                closeOnOutsideClick: true,
                injector: this.injector,
                viewContainerRef: this.viewContainerRef,
                contentType: ModalType.COMPONENT,
                component: FileGalleryComponent,
            })
            .onClose.pipe(
                filter(value => !!value),
                tap(value => {
                    const processedValue = value as File;

                    this.value = processedValue;
                    this.onChangeHandler(processedValue);
                    this.onValueChange.emit(processedValue);

                    this.changeDetectorRef.markForCheck();
                }),
                untilDestroyed(this),
            )
            .subscribe();
    }
}
