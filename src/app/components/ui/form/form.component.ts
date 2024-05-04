import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    HostBinding,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
    inject,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { UntilDestroy } from "@ngneat/until-destroy";

import {
    APDropdownFieldModule,
    APNumberFieldModule,
    APTextFieldModule,
    BackgroundFieldComponent,
    BorderFieldComponent,
    DirectionFieldComponent,
    ItemsControlFieldComponent,
    LZColorPickerComponent,
    LZFileUploadComponent,
    LZImageFieldComponent,
    NumberWithDropdownFieldComponent,
    RadioGroupComponent,
    RangeFieldComponent,
    RangeFieldWithUnitComponent,
    TextareaComponent,
    APFormDefaultTemplateKeys,
    APFormModel,
    ControlTemplate,
} from "@components";

import { AbstractFormService } from "./form.service";
import { provideForm } from "./form.providers";

@UntilDestroy()
@Component({
    selector: "ap-form",
    standalone: true,
    templateUrl: "./form.component.html",
    styleUrls: ["./form.component.scss"],
    encapsulation: ViewEncapsulation.None,
    imports: [
        APTextFieldModule, 
        APNumberFieldModule, 
        APDropdownFieldModule,
        BackgroundFieldComponent,
        BorderFieldComponent,
        CommonModule,
        DirectionFieldComponent,
        ItemsControlFieldComponent,
        LZColorPickerComponent,
        LZFileUploadComponent,
        LZImageFieldComponent,
        NumberWithDropdownFieldComponent,
        RadioGroupComponent,
        RangeFieldComponent,
        RangeFieldWithUnitComponent,
        ReactiveFormsModule,
        TextareaComponent,
    ],
    providers: [provideForm()],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class APFormComponent implements OnChanges, OnInit, OnDestroy {
    @Input()
    public formModel: APFormModel;

    @HostBinding("class.ap-form")
    public hostClass = true;

    // TODO: refactor to new viewChild API
    @ViewChild("textFieldTemplate", {
        static: true,
    })
    private textField: ControlTemplate;

    @ViewChild("numberFieldTemplate", {
        static: true,
    })
    private numberField: ControlTemplate;

    @ViewChild("textAreaFieldTemplate", {
        static: true,
    })
    private textAreaField: ControlTemplate;

    @ViewChild("dropdownFieldTemplate", {
        static: true,
    })
    private dropdownField: ControlTemplate;

    @ViewChild("fileUploadTemplate", {
        static: true,
    })
    private fileUploadField: ControlTemplate;

    @ViewChild("rangeFieldWithUnitTemplate", {
        static: true,
    })
    private rangeWithUnitField: ControlTemplate;

    @ViewChild("rangeFieldTemplate", { static: true })
    private rangeField: ControlTemplate;

    @ViewChild("colorPickerTemplate", {
        static: true,
    })
    private colorField: ControlTemplate;

    @ViewChild("directionFieldTemplate", { static: true })
    private directionField: ControlTemplate;

    @ViewChild("numberWithDropdownField", { static: true })
    private numberWithDropdownField: ControlTemplate;

    @ViewChild("radioGroupTemplate", { static: true })
    private radioGroupField: ControlTemplate;

    @ViewChild("imageUploadTemplate", { static: true })
    private imageUploadField: ControlTemplate;

    @ViewChild("itemsControlTemplate", { static: true })
    private itemsControlField: ControlTemplate;

    @ViewChild("backgroundColorTemplate", { static: true })
    private backgroundColorField: ControlTemplate;

    @ViewChild("borderControlTemplate", { static: true })
    private borderControlField: ControlTemplate;

    @Input()
    public set templatesMap(templatesMap: Record<string, TemplateRef<unknown>>) {
        this._templatesMap = {
            ...(this._defaultTemplatesMap ?? {}),
            ...(templatesMap ?? {}),
        };
    }

    @Output()
    public readonly submitForm: EventEmitter<unknown> = new EventEmitter<unknown>();

    private readonly service: AbstractFormService = inject(AbstractFormService);
    
    public _templatesMap: Record<string, TemplateRef<unknown>>;

    public mainFormGroup = this.service.getMainFormGroup();

    public convertedFormModel = this.service.getConvertedFormModel();

    public valueChanges$ = this.service.valueChanges$;

    public _defaultTemplatesMap: Record<APFormDefaultTemplateKeys | string, TemplateRef<ControlTemplate | unknown>>;

    public ngOnInit(): void {
        this._defaultTemplatesMap = {
            [APFormDefaultTemplateKeys.TEXT_FIELD]: this.textField,
            [APFormDefaultTemplateKeys.NUMBER_FIELD]: this.numberField,
            [APFormDefaultTemplateKeys.DROPDOWN_FIELD]: this.dropdownField,
            [APFormDefaultTemplateKeys.RANGE_FIELD_WITH_UNIT_FIELD]: this.rangeWithUnitField,
            [APFormDefaultTemplateKeys.COLOR_FIELD]: this.colorField,
            [APFormDefaultTemplateKeys.FILE_UPLOAD]: this.fileUploadField,
            [APFormDefaultTemplateKeys.TEXTAREA_FIELD]: this.textAreaField,
            [APFormDefaultTemplateKeys.NUMBER_WITH_DROPDOWN_FIELD]: this.numberWithDropdownField,
            [APFormDefaultTemplateKeys.DIRECTION_FIELD]: this.directionField,
            [APFormDefaultTemplateKeys.RANGE_FIELD]: this.rangeField,
            [APFormDefaultTemplateKeys.RADIO_GROUP_FIELD]: this.radioGroupField,
            [APFormDefaultTemplateKeys.IMAGE_UPLOAD_FIELD]: this.imageUploadField,
            [APFormDefaultTemplateKeys.ITEMS_CONTROL_FIELD]: this.itemsControlField,
            [APFormDefaultTemplateKeys.BACKGROUND_FIELD]: this.backgroundColorField,
            [APFormDefaultTemplateKeys.BORDER_FIELD]: this.borderControlField,
        };

        this._templatesMap = {
            ...this._defaultTemplatesMap,
            ...this._templatesMap,
        };
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.formModel) {
           this.service.processFormModel(this.formModel, changes.formModel.previousValue);

           this.valueChanges$ = this.service.valueChanges$;
        }
    }

    public _onFormSubmit(): void {
        const value = this.service.validateFormValue();

        if (!value) {
            return;
        }

        this.submitForm.emit(value);
    }

    private unsubscribeForm(): void {
       this.service.unsubscribeForm();
    }

    public ngOnDestroy(): void {
        this.unsubscribeForm();
    }
}
