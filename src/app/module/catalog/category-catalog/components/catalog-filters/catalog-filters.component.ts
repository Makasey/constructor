import { APFormDefaultTemplateKeys, APFormModel } from "../../../../../components/form";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { LZToastrItemType } from "../../../../../components/toastr/types";
import { LZToastrService } from "../../../../../components/toastr/store/toastr.service";
import { NgFormsManager } from "@ngneat/forms-manager";
import { Validators } from "@angular/forms";
import { guid } from "@datorama/akita";

@Component({
    selector: "lz-catalog-filters",
    templateUrl: "./catalog-filters.component.html",
    styleUrls: ["./catalog-filters.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogFiltersComponent implements OnInit {
    public formModel: APFormModel = {
        id: crypto.randomUUID(),
        name: "testFormModel",
        innerGroups: [
            {
                id: crypto.randomUUID(),
                name: "innerFormGroup",
                controls: [
                    {
                        id: crypto.randomUUID(),
                        name: "my-awesome-control-2",
                        valueTemplateKey: APFormDefaultTemplateKeys.NUMBER_FIELD,
                        value: 12345,
                        validators: [Validators.required, Validators.min(50), Validators.max(12000)],
                    },
                    {
                        id: crypto.randomUUID(),
                        name: "my-awesome-control-3",
                        valueTemplateKey: APFormDefaultTemplateKeys.DROPDOWN_FIELD,
                        value: [{ id: 1, label: "Petya" }],
                        options: {
                            multi: true,
                            items: [
                                { id: 1, label: "Petya" },
                                { id: 2, label: "Vasya" },
                            ],
                        },
                    },
                ],
            },
        ],
        controls: [
            {
                id: crypto.randomUUID(),
                name: "my-awesome-control",
                valueTemplateKey: APFormDefaultTemplateKeys.TEXT_FIELD,
                value: "12345",
            },
        ],
    };

    constructor(private formsManager: NgFormsManager, private toastrService: LZToastrService) {}

    public ngOnInit(): void {
        this.formsManager.valueChanges("testFormModel").subscribe(console.log);
    }

    public addNotification(): void {
        this.toastrService.addToastrItem({
            id: guid(),
            title: "The best notification",
            text: "Text bla bla bla...",
            type: LZToastrItemType.SUCCESS,
        });
    }
}
