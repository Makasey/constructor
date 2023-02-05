import { APFormControl, APFormDefaultTemplateKeys, APFormModel } from "./types";
import { AbstractControl, FormControl, FormGroup } from "@angular/forms";
import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from "@angular/core";
import { ControlTemplate } from "../modal/types";
import { NgFormsManager } from "@ngneat/forms-manager";
import { UntilDestroy } from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
    selector: "ap-form",
    templateUrl: "./form.component.html",
    styleUrls: ["./form.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class APFormComponent implements OnChanges, OnInit, OnDestroy {
    @Input()
    public formModel: APFormModel;

    @HostBinding("class.ap-form")
    public hostClass: boolean = true;

    @ViewChild("textFieldTemplate", {
        static: true,
    })
    private textField: ControlTemplate;

    @ViewChild("numberFieldTemplate", {
        static: true,
    })
    private numberField: ControlTemplate;

    @ViewChild("dropdownFieldTemplate", {
        static: true,
    })
    private dropdownField: ControlTemplate;

    @Output()
    public submitForm: EventEmitter<any> = new EventEmitter<any>();

    public mainFormGroup: FormGroup | null = null;

    public _convertedFormModel: APFormModel;

    public _defaultTemplatesMap: Record<APFormDefaultTemplateKeys | string, TemplateRef<ControlTemplate | any>>;

    private subscribedForms: string[] = [];

    private formGroupMap: Record<string, AbstractControl> = {};

    constructor(private formsManager: NgFormsManager) {}

    public ngOnInit(): void {
        this._defaultTemplatesMap = {
            [APFormDefaultTemplateKeys.TEXT_FIELD]: this.textField,
            [APFormDefaultTemplateKeys.NUMBER_FIELD]: this.numberField,
            [APFormDefaultTemplateKeys.DROPDOWN_FIELD]: this.dropdownField,
        };
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes["formModel"]) {
            this.unsubscribeForm();
            this._convertedFormModel = {
                ...this.formModel,
                controls: this.formModel.controls.map(control => {
                    return {
                        ...control,
                        id: control.id || crypto.randomUUID(),
                    };
                }),
            };
            this.mainFormGroup = this.convertToNativeGroup(this.formModel);
            this.registerGroupInFormsManager(this.formModel);
        }
    }

    public convertToNativeGroup(formModel: APFormModel): FormGroup | null {
        if (!formModel) {
            return null;
        }
        const controls = (formModel.controls && this.convertToControlsMap(formModel.controls)) ?? {};
        const newFormGroup: FormGroup = new FormGroup(
            {
                ...controls,
            },
            {
                validators: formModel.validators,
                asyncValidators: formModel.asyncValidators,
                updateOn: formModel.updateOn,
            },
        );
        if (formModel.id) {
            this.formGroupMap[formModel.id] = newFormGroup;
        }

        return newFormGroup;
    }

    private convertToControlsMap(controls: APFormControl[]): Record<string, FormControl> | null {
        return (
            controls &&
            controls.reduce<Record<string, FormControl>>((result, next) => {
                result[next.name] = this.toNativeControl(next);
                return result;
            }, {})
        );
    }

    private registerGroupInFormsManager(formModel: APFormModel): void {
        if (!formModel) {
            return;
        }
        this.formsManager.upsert(formModel.name, this.mainFormGroup!, formModel.upsertConfig);
        this.subscribedForms.push(formModel.name);
    }

    private toNativeControl(control: APFormControl): FormControl {
        return new FormControl(
            {
                value: control.value === undefined ? control.defaultValue : control.value,
                disabled: control.disabled,
            },
            {
                validators: control.validators,
                asyncValidators: control.asyncValidators,
                updateOn: control.updateOn,
            },
        );
    }

    public _onFormSubmit(): void {
        if (!this.mainFormGroup) {
            return;
        }

        if (!this.mainFormGroup.valid) {
            this.mainFormGroup.updateValueAndValidity();
            return;
        }
        console.log("CLICKED");
        this.submitForm.emit(this.mainFormGroup.value);
    }

    private unsubscribeForm(): void {
        this.subscribedForms.forEach(formName => {
            this.formsManager.unsubscribe(formName);
            this.formsManager.destroy(formName);
        });
        this.subscribedForms = [];
    }

    public ngOnDestroy(): void {
        this.unsubscribeForm();
    }
}
