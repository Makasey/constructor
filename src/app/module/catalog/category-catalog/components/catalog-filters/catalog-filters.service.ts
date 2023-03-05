import { APFormDefaultTemplateKeys, APFormModel } from "src/app/components";
import { AbstractDefaultModuleService, AbstractModuleService } from "src/app/core/abstract/abstract.service";
import { AbstractProductDataService } from "src/app/core/data-service";
import { Injectable } from "@angular/core";
import { LzQuery } from "src/app/core/store/lz.query";
import { LzService } from "src/app/core/store/lz.service";
import { LzStateKey } from "src/app/core/store/lz.state";
import { Observable, tap } from "rxjs";
import { Router } from "@angular/router";
import { UIDataState } from "src/app/core/store/states/ui-states";
import { selectRouterParameters } from "src/app/utils";

@Injectable()
export abstract class AbstractCatalogFiltersService extends AbstractModuleService {
    public abstract selectFilters(): Observable<APFormModel>;
    public abstract applyFilters(): void;
}

@Injectable()
export class DefaultCatalogFiltersService
    extends AbstractDefaultModuleService<LzStateKey.CATALOG_FILTERS_STATE>
    implements AbstractCatalogFiltersService
{
    constructor(
        protected query: LzQuery,
        protected service: LzService,
        private productDataService: AbstractProductDataService,
        private router: Router,
    ) {
        super(LzStateKey.CATALOG_FILTERS_STATE, query, service);
    }

    public asyncInit(options?: { productId: number; }): Observable<unknown> {
        selectRouterParameters("priceFrom", "priceTo").subscribe(console.log);
        return this.productDataService.getProducts().pipe(
            tap(products => {
                this.updateState(state => {
                    return {
                        ...state,
                        dataState: UIDataState.LOADED,
                        filters: {
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
                                            value: [],
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
                        },
                    };
                });
            }),
        );
    }

    public applyFilters(): void {
        void this.router.navigate([], { queryParams: { priceFrom: "eq(120)", priceTo: 20 } });
    }

    public selectFilters(): Observable<APFormModel> {
        return this.selectState(state => state.filters);
    }
}
