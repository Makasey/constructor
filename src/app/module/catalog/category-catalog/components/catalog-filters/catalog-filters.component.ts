import { APFormDefaultTemplateKeys, APFormModel } from "src/app/components/form";

import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { NgFormsManager } from "@ngneat/forms-manager";

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
                        options: {
                            title: "Букеты из роз",
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
                        options: {
                            title: "Цена",
                        },
                    },
                    {
                        id: crypto.randomUUID(),
                        name: "color-flowers",
                        valueTemplateKey: APFormDefaultTemplateKeys.COLOR_FIELD,
                        value: null,
                        options: {
                            title: "Цвета",
                        },
                    },
                    {
                        id: crypto.randomUUID(),
                        name: "diameter-flowers",
                        valueTemplateKey: APFormDefaultTemplateKeys.CHECKBOX_FIELD,
                        value: [],
                        options: {
                            title: "Размер",
                            label: "Диаметр букета",
                        },
                    },
                    {
                        id: crypto.randomUUID(),
                        name: "height-flowers",
                        valueTemplateKey: APFormDefaultTemplateKeys.CHECKBOX_FIELD,
                        value: [],
                        options: {
                            label: "Высота букета",
                        },
                    },
                    {
                        id: crypto.randomUUID(),
                        name: "composition-flowers",
                        valueTemplateKey: APFormDefaultTemplateKeys.CHECKBOX_FIELD,
                        value: [],
                        options: {
                            title: "Состав",
                            columnDirection: true,
                        },
                    },
                    {
                        id: crypto.randomUUID(),
                        name: "for-someone-flowers",
                        valueTemplateKey: APFormDefaultTemplateKeys.CHECKBOX_FIELD,
                        value: [],
                        options: {
                            title: "Кому",
                            columnDirection: true,
                        },
                    },
                ],
            },
        ],
        controls: [],
    };

    constructor(private formsManager: NgFormsManager) {}

    public ngOnInit(): void {
        this.formsManager.valueChanges("filtersFormModel").subscribe(console.log);
    }
}
