import { APFormDefaultTemplateKeys, APFormModel } from "src/app/components/form";

import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { LZToastrItemType } from "../../../../../components/toastr/types";
import { LZToastrService } from "../../../../../components/toastr/store/toastr.service";
import { NgFormsManager } from "@ngneat/forms-manager";
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
        name: "filtersFormModel",
        innerGroups: [
            {
                id: crypto.randomUUID(),
                name: "filtersFormGroup",
                controls: [
                    {
                        id: crypto.randomUUID(),
                        name: "category-flowers",
                        valueTemplateKey: APFormDefaultTemplateKeys.CATEGORY_CONTROLLER,
                        value: null,
                        controlClass: "filters-group",
                        options: {
                            title: "Букеты из роз",
                            titleClass: "filters-title",
                        },
                    },
                    {
                        id: crypto.randomUUID(),
                        name: "price-flowers",
                        valueTemplateKey: APFormDefaultTemplateKeys.RANGE_FIELD,
                        value: {
                            min: 1500,
                            max: 23000,
                        },
                        controlClass: "filters-group",
                        options: {
                            title: "Цена",
                            titleClass: "filters-title",
                        },
                    },
                    {
                        id: crypto.randomUUID(),
                        name: "color-flowers",
                        valueTemplateKey: APFormDefaultTemplateKeys.COLOR_FIELD,
                        value: null,
                        controlClass: "filters-group",
                        options: {
                            titleClass: "filters-title",
                            title: "Цвета",
                        },
                    },
                    {
                        id: crypto.randomUUID(),
                        name: "diameter-flowers",
                        valueTemplateKey: APFormDefaultTemplateKeys.CHECKBOX_FIELD,
                        value: [],
                        controlClass: "filters-group",
                        options: {
                            title: "Размер",
                            titleClass: "filters-title",
                            label: "Диаметр букета",
                        },
                    },
                    {
                        id: crypto.randomUUID(),
                        name: "height-flowers",
                        valueTemplateKey: APFormDefaultTemplateKeys.CHECKBOX_FIELD,
                        value: [],
                        controlClass: "filters-group",
                        options: {
                            label: "Высота букета",

                        },
                    },
                    {
                        id: crypto.randomUUID(),
                        name: "composition-flowers",
                        valueTemplateKey: APFormDefaultTemplateKeys.CHECKBOX_FIELD,
                        value: [],
                        controlClass: "filters-group",
                        options: {
                            title: "Состав",
                            columnDirection: true,
                            titleClass: "filters-title",
                        },
                    },
                    {
                        id: crypto.randomUUID(),
                        name: "for-someone-flowers",
                        valueTemplateKey: APFormDefaultTemplateKeys.CHECKBOX_FIELD,
                        controlClass: "filters-group",
                        value: [],
                        options: {
                            title: "Кому",
                            titleClass: "filters-title",
                            columnDirection: true,
                        },
                    },
                ],
            },
        ],
        controls: [],
    };

    constructor(private formsManager: NgFormsManager, private toastrService: LZToastrService) {}

    public ngOnInit(): void {
        this.formsManager.valueChanges("filtersFormModel").subscribe(console.log);
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
