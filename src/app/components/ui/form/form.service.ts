import { Injectable, WritableSignal, signal, Signal } from "@angular/core";
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from "@angular/forms";

import { Observable, distinctUntilChanged, skip } from "rxjs";

import { NgFormsManager } from "@ngneat/forms-manager";

import {
    APFormControl,
    APFormModel,
    ApFormControlInner,
    ApFormInnerModel,
    gridAreasFromColumns,
} from "@components";
import { getRandomId, isObjectEquals } from "@shared-utils";

@Injectable()
export abstract class AbstractFormService {
    public abstract unsubscribeForm(): void;

    public abstract validateFormValue<T = unknown>(): T | null;

    public abstract processFormModel(formModel: APFormModel, previousValue: APFormModel): void;

    public abstract valueChanges$: Observable<unknown>;

    public abstract getMainFormGroup(): Signal<FormGroup | null>;

    public abstract getConvertedFormModel(): Signal<ApFormInnerModel>;
}

@Injectable()
export class DefaultFormService extends AbstractFormService {
    constructor(private formsManager: NgFormsManager) {
        super();
    }

    public valueChanges$: Observable<unknown>;

    private mainFormGroup: WritableSignal<FormGroup | null> = signal(null);

    private convertedFormModel: WritableSignal<ApFormInnerModel> = signal(undefined);

    private subscribedForms: WritableSignal<string[]> = signal([]);

    private formGroupMap: WritableSignal<Record<string, AbstractControl>> = signal({});

    public getMainFormGroup(): Signal<FormGroup | null> {
        return this.mainFormGroup.asReadonly();
    }

    public getConvertedFormModel(): Signal<ApFormInnerModel> {
        return this.convertedFormModel.asReadonly();
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

    private updateFormArray(formArray: FormArray, updatedFormInner: ApFormInnerModel): void {
        const formArrayCopy = this.getFormArrayCopy(formArray);

        updatedFormInner.innerGroups!.forEach((group, index) => {
            const existingFormGroup: AbstractControl = this.formGroupMap()[group.id];

            if (existingFormGroup) {
                formArrayCopy.setControl(index, existingFormGroup);
            } else {
                const formGroup: FormGroup = this.convertToNativeGroup(group)!;
                formArrayCopy.setControl(index, formGroup);
            }
        });

        for (let i = updatedFormInner.innerGroups!.length; i < formArrayCopy.controls.length; i++) {
            formArrayCopy.removeAt(i);
        }
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

    private convertToGroupsMap(models: ApFormInnerModel[]): Record<string, FormGroup | FormArray> | null {
        if(!models) {
            return null;
        }

        return models.reduce(
                (result, next) => {
                    if (next?.isFormArray) {
                        result[next.name] = this.convertToNativeFormArray(next)!;
                    } else {
                        result[next.name] = this.convertToNativeGroup(next)!;
                    }

                    return result;
                },
                {} as Record<string, FormGroup | FormArray>,
            );
    }

    private updateFormGroup(formGroup: FormGroup, updatedFormInner: ApFormInnerModel, oldFormInner: APFormModel): void {
        const controlsKeysList: string[] = [];
        const groupsKeyList: string[] = [];
        const formGroupCopy = this.getFormGroupCopy(formGroup);

        updatedFormInner.innerControls?.forEach(innerControl => {
            const formControl: FormControl = this.toNativeControl(innerControl);
            if (!formGroupCopy.get(innerControl.name)) {
                formGroupCopy.addControl(innerControl.name, formControl);
            } else {
                const innerControlInstance = formGroupCopy.get(innerControl.name)!;
                innerControlInstance.setValidators(innerControl.validators ?? []);
                const oldControl: APFormControl =
                    oldFormInner?.controls &&
                    ([] as APFormControl[])
                        .concat(...oldFormInner.controls)
                        .find((oldControl: APFormControl) => oldControl.name === innerControl.name)!;
                if (oldControl && innerControl.valueTemplateKey !== oldControl.valueTemplateKey) {
                    formGroupCopy.removeControl(innerControl.name);
                    formGroupCopy.addControl(innerControl.name, formControl);
                } else {
                    formGroupCopy.setControl(innerControl.name, formControl);
                }
            }
            controlsKeysList.push(innerControl.name);
        });

        updatedFormInner.innerGroups?.forEach(innerGroup => {
            if (!formGroupCopy.get(innerGroup.name)) {
                const newFormGroup: FormGroup = this.convertToNativeGroup(innerGroup)!;
                formGroupCopy.addControl(innerGroup.name, newFormGroup);
            }
            groupsKeyList.push(innerGroup.name);
        });
        Object.keys(formGroupCopy.controls)?.forEach(key => {
            if (!controlsKeysList?.includes(key) && !groupsKeyList?.includes(key)) {
                formGroupCopy.removeControl(key);
            }
        });
        updatedFormInner.innerGroups?.forEach(innerGroup => {
            if (innerGroup.isFormArray) {
                this.updateFormArray(formGroupCopy.controls[innerGroup.name] as FormArray, innerGroup);
            } else {
                const oldGroup = oldFormInner?.innerGroups?.find(oldGroup => oldGroup.name === innerGroup.name);
                this.updateFormGroup(formGroupCopy.controls[innerGroup.name] as FormGroup, innerGroup, oldGroup!);
            }
        });

        this.mainFormGroup.set(formGroupCopy);
        this.convertedFormModel.set(updatedFormInner);
    }

    private getFormGroupCopy(formGroup: FormGroup): FormGroup {
        const { controls, validator, asyncValidator, updateOn } = formGroup;

        const formGroupCopy = new FormGroup({}, {
            validators: validator,
            asyncValidators: asyncValidator,
            updateOn: updateOn,
        });

        controls.forEach(control => {
            if(control instanceof FormGroup) {
                formGroupCopy.addControl(control.name, this.getFormGroupCopy(control));
                
                return;
            }

            if(control instanceof FormArray) {
                formGroup.addControl(control.name, this.getFormArrayCopy(control));

                return;
            }

            formGroupCopy.addControl(control.name, this.getFormControlCopy(control as FormControl));
        });

        return formGroupCopy;
    }

    private getFormArrayCopy(formArray: FormArray): FormArray {
        const { controls, validator, asyncValidator, updateOn } = formArray;
        const formArrayCopy = new FormArray([], {
            validators: validator,
            asyncValidators: asyncValidator,
            updateOn: updateOn,
        });

        controls.forEach((control, index) => {
            if(control instanceof FormGroup) {
                formArrayCopy.setControl(index, this.getFormGroupCopy(control));
                
                return;
            }

            if(control instanceof FormArray) {
                formArrayCopy.addControl(index, this.getFormArrayCopy(control));

                return;
            }

            formArrayCopy.addControl(index, this.getFormControlCopy(control as FormControl));
        })

        return formArrayCopy;
    }

    private getFormControlCopy(control: FormControl): FormControl {
        const { value, disabled, validators, asyncValidators, updateOn } = control;
        
        return new FormControl({
            value: value,
            disabled: disabled,
        }, {
            validators: validators,
            asyncValidators: asyncValidators,
            updateOn: updateOn,
        });
    }

    private normalizeFields(formModel: APFormModel, currentPath: string[] = []): ApFormInnerModel | null {
        if (!formModel) {
            return null;
        }

        if(!formModel.controls) {
            return null;
        }

        let i = 65;

        const coerceControls = Array.isArray(formModel.controls[0]) ? (formModel.controls as APFormControl[][]) : [formModel.controls as APFormControl[]];

        const resultControls: ApFormControlInner[][] = coerceControls.map(item => {
                return this.normalizeControls(item, currentPath, i++);
            }
        );

        const filteredInnerGroups = formModel.innerGroups?.filter(group => !!group);
        const mappedInnerGroups = filteredInnerGroups?.map((group, i) => {
            const pathItem: string = formModel.isFormArray ? `${i}` : group.name;
            return this.normalizeFields(group, [...currentPath, pathItem]) ?? ({} as ApFormInnerModel);
        });

        return {
            ...formModel,
            innerControls: resultControls.reduce((result, next) => [...result, ...next]),
            gridAreas: gridAreasFromColumns(resultControls?.map(its => its.filter(it => !it.hidden))),
            innerGroups: mappedInnerGroups ?? [],
            path: currentPath.length > 0 ? currentPath : undefined,
            firstColumnLength: resultControls?.[0]?.length ?? 0,
        };
    }

    private normalizeControl (control: APFormControl, currentPath: string[], charIndex: number): ApFormControlInner {
        const path = [...currentPath, control.name];

        return {
            ...control,
            path: path,
            required: !control.required
                ? Array.isArray(control.validators)
                    ? control.validators.includes(Validators.required)
                    : control.validators === Validators.required
                : control.required,
            id: control.id ?? getRandomId(),
            gridClass: String.fromCharCode(charIndex++),
        };
    };  

    private normalizeControls (controls: APFormControl[], currentPath: string[], startIndex: number): ApFormControlInner[] {
        return controls.filter(it => !!it).map(item => this.normalizeControl(item, currentPath, startIndex++));
    };

    private convertToControlsMap(controls: APFormControl[]): Record<string, FormControl> | null {
        if(!controls) {
            return null;
        }

        return controls.reduce<Record<string, FormControl>>((result, next) => {
                result[next.name] = this.toNativeControl(next);
                return result;
            }, {});
    }

    private convertToNativeGroup(formModel: ApFormInnerModel): FormGroup | null {
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
            this.formGroupMap.set({
                ...this.formGroupMap(),
                [formModel.id]: newFormGroup,
            });
        }

        return newFormGroup;
    }

    private registerGroupInFormsManager(formModel: APFormModel): void {
        if (!formModel) {
            return;
        }

        this.formsManager.upsert(formModel.name, this.mainFormGroup()!, formModel.upsertConfig);
        this.subscribedForms.set(...this.subscribedForms(), formModel.name);

        this.valueChanges$ = this.formsManager.valueChanges(formModel.name).pipe(
            skip(1),
            distinctUntilChanged((previous, current) => isObjectEquals(previous, current)),
        );
    }

    public unsubscribeForm(): void {
        this.subscribedForms().forEach(formName => {
            this.formsManager.unsubscribe(formName);
            this.formsManager.destroy(formName);
        });

        this.subscribedForms.set([]);
    }

    public validateFormValue<T = unknown>(): T | null {
        const formGroup = this.mainFormGroup();

        if (!formGroup) {
            return null;
        }

        if (!formGroup.valid) {
            formGroup.updateValueAndValidity();
            return null;
        }

        return formGroup.value as T;
    }

    public processFormModel(formModel: APFormModel, previousValue: APFormModel): void {
        this.unsubscribeForm();
        this.convertedFormModel.set(this.normalizeFields(formModel)!);

        if (this.mainFormGroup()) {
            this.updateFormGroup(this.mainFormGroup(), this.convertedFormModel(), previousValue as APFormModel);
        } else {
            this.mainFormGroup.set(this.convertToNativeGroup(this.convertedFormModel()));
        }
        this.registerGroupInFormsManager(formModel);
    }
}