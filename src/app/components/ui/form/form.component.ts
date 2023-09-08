import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
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
} from "@angular/core";

import { NgFormsManager } from "@ngneat/forms-manager";
import { UntilDestroy } from "@ngneat/until-destroy";

import { APFormControl, APFormDefaultTemplateKeys, APFormModel, ApFormControlInner, ApFormInnerModel, gridAreasFromColumns } from "./types";
import { ControlTemplate } from "../modal";

@UntilDestroy()
@Component({
    selector: "ap-form",
    templateUrl: "./form.component.html",
    styleUrls: ["./form.component.scss"],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class APFormComponent implements OnChanges, OnInit, OnDestroy {
    @Input()
    public formModel: APFormModel;

    @HostBinding("class.ap-form")
    public hostClass = true;

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

    @ViewChild("categoryControllerTemplate", {
        static: true,
    })
    private categoryControllerField: ControlTemplate;

    @ViewChild("fileUploadTemplate", {
        static: true,
    })
    private fileUploadField: ControlTemplate;

    @ViewChild("rangeFieldTemplate", {
        static: true,
    })
    private rangeField: ControlTemplate;

    @ViewChild("colorPickerTemplate", {
        static: true,
    })
    private colorField: ControlTemplate;

    @ViewChild("checkboxGroupTemplate", {
        static: true,
    })
    private checkboxField: ControlTemplate;

    @Input()
    public set templatesMap(templatesMap: Record<string, TemplateRef<unknown>>) {
        this._templatesMap = {
            ...(this._defaultTemplatesMap ?? {}),
            ...(templatesMap ?? {}),
        };
    }

    @Output()
    public readonly submitForm: EventEmitter<unknown> = new EventEmitter<unknown>();

    public mainFormGroup: FormGroup | null = null;

    public _convertedFormModel: ApFormInnerModel;

    public _templatesMap: Record<string, TemplateRef<unknown>>;

    public _defaultTemplatesMap: Record<APFormDefaultTemplateKeys | string, TemplateRef<ControlTemplate | unknown>>;

    private subscribedForms: string[] = [];

    private formGroupMap: Record<string, AbstractControl> = {};

    constructor(private formsManager: NgFormsManager) {}

    public ngOnInit(): void {
        this._defaultTemplatesMap = {
            [APFormDefaultTemplateKeys.TEXT_FIELD]: this.textField,
            [APFormDefaultTemplateKeys.NUMBER_FIELD]: this.numberField,
            [APFormDefaultTemplateKeys.DROPDOWN_FIELD]: this.dropdownField,
            [APFormDefaultTemplateKeys.CATEGORY_CONTROLLER]: this.categoryControllerField,
            [APFormDefaultTemplateKeys.RANGE_FIELD]: this.rangeField,
            [APFormDefaultTemplateKeys.COLOR_FIELD]: this.colorField,
            [APFormDefaultTemplateKeys.FILE_UPLOAD]: this.fileUploadField,
            [APFormDefaultTemplateKeys.CHECKBOX_FIELD]: this.checkboxField,
            [APFormDefaultTemplateKeys.TEXTAREA_FIELD]: this.textAreaField,
        };

        this._templatesMap = {
            ...this._defaultTemplatesMap,
            ...this._templatesMap,
        };
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.formModel) {
            this.unsubscribeForm();
            this._convertedFormModel = this.normalizeFields(this.formModel)!;

            if (this.mainFormGroup) {
                this.updateFormGroup(this.mainFormGroup, this._convertedFormModel, changes.formModel.previousValue as APFormModel);
            } else {
                this.mainFormGroup = this.convertToNativeGroup(this._convertedFormModel);
            }
            this.registerGroupInFormsManager(this.formModel);
        }
    }

    public convertToNativeGroup(formModel: ApFormInnerModel): FormGroup | null {
        if (!formModel) {
            return null;
        }
        const controls = (formModel.innerControls && this.convertToControlsMap(formModel.innerControls)) ?? {};
        const innerGroups = this.convertToGroupsMap(formModel.innerGroups ?? []) ?? {};
        const newFormGroup: FormGroup = new FormGroup(
            {
                ...controls,
                ...innerGroups,
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

    private normalizeFields(formModel: APFormModel, currentPath: string[] = []): ApFormInnerModel | null {
        if (!formModel) {
            return null;
        }

        let i = 65;

        const normalizeControl = (control: APFormControl): ApFormControlInner => {
            const path = [...currentPath, control.name];

            return {
                ...control,
                path: path,
                required: !control.required
                    ? Array.isArray(control.validators)
                        ? control.validators.includes(Validators.required)
                        : control.validators === Validators.required
                    : control.required,
                id: control.id ?? crypto.randomUUID(),
                gridClass: String.fromCharCode(i++),
            };
        };

        const normalizeControls = (controls: APFormControl[]): ApFormControlInner[] => {
            return controls.filter(it => !!it).map(normalizeControl);
        };

        const resultControls: ApFormControlInner[][] =
            formModel.controls &&
            (Array.isArray(formModel.controls[0]) ? (formModel.controls as APFormControl[][]) : [formModel.controls as APFormControl[]]).map(
                normalizeControls,
            );

        return {
            ...formModel,
            innerControls: resultControls?.reduce((result, next) => [...result, ...next]),
            gridAreas: gridAreasFromColumns(resultControls?.map(its => its.filter(it => !it.hidden))),
            innerGroups:
                formModel.innerGroups
                    ?.filter(group => !!group)
                    .map((group, i) => {
                        const pathItem: string = formModel.isFormArray ? `${i}` : group.name;
                        return this.normalizeFields(group, [...currentPath, pathItem]) ?? ({} as ApFormInnerModel);
                    }) ?? [],
            path: currentPath.length > 0 ? currentPath : undefined,
            firstColumnLength: resultControls?.[0]?.length ?? 0,
        };
    }

    private updateFormGroup(formGroup: FormGroup, updatedFormInner: ApFormInnerModel, oldFormInner: APFormModel): void {
        const controlsKeysList: string[] = [];
        const groupsKeyList: string[] = [];

        updatedFormInner.innerControls?.forEach(innerControl => {
            const formControl: FormControl = this.toNativeControl(innerControl);
            if (!formGroup.get(innerControl.name)) {
                formGroup.addControl(innerControl.name, formControl);
            } else {
                const innerControlInstance = formGroup.get(innerControl.name)!;
                innerControlInstance.setValidators(innerControl.validators ?? []);
                const oldControl: APFormControl =
                    oldFormInner?.controls &&
                    ([] as APFormControl[])
                        .concat(...oldFormInner.controls)
                        .find((oldControl: APFormControl) => oldControl.name === innerControl.name)!;
                if (oldControl && innerControl.valueTemplateKey !== oldControl.valueTemplateKey) {
                    formGroup.removeControl(innerControl.name);
                    formGroup.addControl(innerControl.name, formControl);
                } else {
                    formGroup.setControl(innerControl.name, formControl);
                }
            }
            controlsKeysList.push(innerControl.name);
        });

        updatedFormInner.innerGroups?.forEach(innerGroup => {
            if (!formGroup.get(innerGroup.name)) {
                const newFormGroup: FormGroup = this.convertToNativeGroup(innerGroup)!;
                formGroup.addControl(innerGroup.name, newFormGroup);
            }
            groupsKeyList.push(innerGroup.name);
        });
        Object.keys(formGroup.controls)?.forEach(key => {
            if (!controlsKeysList?.includes(key) && !groupsKeyList?.includes(key)) {
                formGroup.removeControl(key);
            }
        });
        updatedFormInner.innerGroups?.forEach(innerGroup => {
            if (innerGroup.isFormArray) {
                this.updateFormArray(formGroup.controls[innerGroup.name] as FormArray, innerGroup);
            } else {
                const oldGroup = oldFormInner?.innerGroups?.find(oldGroup => oldGroup.name === innerGroup.name);
                this.updateFormGroup(formGroup.controls[innerGroup.name] as FormGroup, innerGroup, oldGroup!);
            }
        });
    }

    private convertToGroupsMap(models: ApFormInnerModel[]): Record<string, FormGroup | FormArray> | null {
        return (
            models &&
            models.reduce(
                (result, next) => {
                    if (next?.isFormArray) {
                        result[next.name] = this.convertToNativeFormArray(next)!;
                    } else {
                        result[next.name] = this.convertToNativeGroup(next)!;
                    }

                    return result;
                },
                {} as Record<string, FormGroup | FormArray>,
            )
        );
    }

    private convertToNativeFormArray(formModel: ApFormInnerModel): FormArray | null {
        if (!formModel) {
            return null;
        }

        const innerGroups = formModel.innerGroups!.map(group => this.convertToNativeGroup(group)!);

        return new FormArray(innerGroups, {
            validators: formModel.validators,
            asyncValidators: formModel.asyncValidators,
            updateOn: formModel.updateOn,
        });
    }

    private updateFormArray(formArray: FormArray, updatedFormInner: ApFormInnerModel): void {
        updatedFormInner.innerGroups!.forEach((group, index) => {
            const existingFormGroup: AbstractControl = this.formGroupMap[group.id];

            if (existingFormGroup) {
                formArray.setControl(index, existingFormGroup);
            } else {
                const formGroup: FormGroup = this.convertToNativeGroup(group)!;
                formArray.setControl(index, formGroup);
            }
        });

        for (let i = updatedFormInner.innerGroups!.length; i < formArray.controls.length; i++) {
            formArray.removeAt(i);
        }
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

    public trackByGroup(_: number, group: APFormModel): string {
        return group.id;
    }

    public trackByControl(_: number, control: ApFormControlInner): string {
        return control.name;
    }
}
