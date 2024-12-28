import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Signal,
    SimpleChanges,
    TemplateRef,
    ViewEncapsulation,
    computed,
    inject,
    input,
    output,
    viewChild,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { UntilDestroy } from "@ngneat/until-destroy";

import {
    APDropdownFieldComponent,
    APFormDefaultTemplateKeys,
    APFormModel,
    APNumberFieldComponent,
    BackgroundFieldComponent,
    BorderFieldComponent,
    ControlTemplate,
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
} from "@components";

import { APTextFieldComponent } from "../controls/text-field/text-field.component";
import { AbstractFormService } from "./form.service";
import { provideForm } from "@components/ui";

@UntilDestroy()
@Component({
    selector: "ap-form",
    templateUrl: "./form.component.html",
    styleUrls: ["./form.component.scss"],
    encapsulation: ViewEncapsulation.None,
    imports: [
        APTextFieldComponent,
        APNumberFieldComponent,
        APDropdownFieldComponent,
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
    public readonly formModel = input.required<APFormModel>();

    @HostBinding("class.ap-form")
    public hostClass = true;

    // TODO: refactor to new viewChild.required API
    public readonly textField = viewChild.required<ControlTemplate>("textFieldTemplate");

    public readonly numberField = viewChild.required<ControlTemplate>("numberFieldTemplate");

    public readonly textAreaField = viewChild.required<ControlTemplate>("textAreaFieldTemplate");

    public readonly dropdownField = viewChild.required<ControlTemplate>("dropdownFieldTemplate");

    public readonly fileUploadField = viewChild.required<ControlTemplate>("fileUploadTemplate");

    public readonly rangeWithUnitField = viewChild.required<ControlTemplate>("rangeFieldWithUnitTemplate");

    public readonly rangeField = viewChild.required<ControlTemplate>("rangeFieldTemplate");

    public readonly colorField = viewChild.required<ControlTemplate>("colorPickerTemplate");

    public readonly directionField = viewChild.required<ControlTemplate>("directionFieldTemplate");

    public readonly numberWithDropdownField = viewChild.required<ControlTemplate>("numberWithDropdownField");

    public readonly radioGroupField = viewChild.required<ControlTemplate>("radioGroupTemplate");

    public readonly imageUploadField = viewChild.required<ControlTemplate>("imageUploadTemplate");

    public readonly itemsControlField = viewChild.required<ControlTemplate>("itemsControlTemplate");

    public readonly backgroundColorField = viewChild.required<ControlTemplate>("backgroundColorTemplate");

    public readonly borderControlField = viewChild.required<ControlTemplate>("borderControlTemplate");

    @Input()
    public set templatesMap(templatesMap: Record<string, TemplateRef<unknown>>) {
        this._templatesMap = {
            ...(this._defaultTemplatesMap ?? {}),
            ...(templatesMap ?? {}),
        };
    }

    public readonly submitForm = output<unknown>();

    private readonly service: AbstractFormService = inject(AbstractFormService);

    public _templatesMap: Record<string, TemplateRef<unknown>>;

    public mainFormGroup = this.service.getMainFormGroup();

    public convertedFormModel = this.service.getConvertedFormModel();

    public formValue = this.service.valueChanges;

    public readonly valueChanges: Signal<undefined> = computed(() => {
        this.submitForm.emit(this.formValue());

        return undefined;
    });

    public _defaultTemplatesMap: Record<APFormDefaultTemplateKeys | string, TemplateRef<ControlTemplate | unknown>>;

    public ngOnInit(): void {
        this._defaultTemplatesMap = {
            [APFormDefaultTemplateKeys.TEXT_FIELD]: this.textField(),
            [APFormDefaultTemplateKeys.NUMBER_FIELD]: this.numberField(),
            [APFormDefaultTemplateKeys.DROPDOWN_FIELD]: this.dropdownField(),
            [APFormDefaultTemplateKeys.RANGE_FIELD_WITH_UNIT_FIELD]: this.rangeWithUnitField(),
            [APFormDefaultTemplateKeys.COLOR_FIELD]: this.colorField(),
            [APFormDefaultTemplateKeys.FILE_UPLOAD]: this.fileUploadField(),
            [APFormDefaultTemplateKeys.TEXTAREA_FIELD]: this.textAreaField(),
            [APFormDefaultTemplateKeys.NUMBER_WITH_DROPDOWN_FIELD]: this.numberWithDropdownField(),
            [APFormDefaultTemplateKeys.DIRECTION_FIELD]: this.directionField(),
            [APFormDefaultTemplateKeys.RANGE_FIELD]: this.rangeField(),
            [APFormDefaultTemplateKeys.RADIO_GROUP_FIELD]: this.radioGroupField(),
            [APFormDefaultTemplateKeys.IMAGE_UPLOAD_FIELD]: this.imageUploadField(),
            [APFormDefaultTemplateKeys.ITEMS_CONTROL_FIELD]: this.itemsControlField(),
            [APFormDefaultTemplateKeys.BACKGROUND_FIELD]: this.backgroundColorField(),
            [APFormDefaultTemplateKeys.BORDER_FIELD]: this.borderControlField(),
        };

        this._templatesMap = {
            ...this._defaultTemplatesMap,
            ...this._templatesMap,
        };
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.formModel) {
            this.service.processFormModel(this.formModel(), changes.formModel.previousValue);
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
