import { ChangeDetectionStrategy, Component, OnInit, inject } from "@angular/core";

import { Observable } from "rxjs";

import { UntilDestroy } from "@ngneat/until-destroy";

import { Tree } from "@components/ui/tree/tree.component";

import { AbstractLzStoreService } from "@core/store/abstract/lz-abstract.service";
import { LzAbstractQuery } from "@core/store/abstract/lz-abstract.query";
import { LzQueryInjectionTokensMap, LzServiceInjectionTokensMap } from "@core/store/abstract/types";
import { LzStateKey } from "@core/store/lz.state";
import { UIDataState } from "@core/store/states/ui-states";

import { Product } from "../../types";
import { TestService } from "./store";

@UntilDestroy()
@Component({
    selector: "app-test",
    templateUrl: "./test.component.html",
    styleUrls: ["./test.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestComponent implements OnInit {
    public products$: Observable<Product[]> = this.service.selectProducts();

    public tree: Tree = {
        value: 1,
        children: [
            {
                value: 2,
                children: [
                    {
                        value: 4,
                        children: [],
                    },
                    {
                        value: 5,
                        children: [
                            {
                                value: 6,
                                children: [],
                            },
                            {
                                value: 7,
                                children: [],
                            },
                        ],
                    },
                ],
            },
            {
                value: 3,
                children: [
                    {
                        value: 8,
                        children: [],
                    },
                    {
                        value: 9,
                        children: [],
                    },
                ],
            },
        ],
    };

    private readonly query: LzAbstractQuery<LzStateKey.TEST_STATE> = inject(LzQueryInjectionTokensMap[LzStateKey.TEST_STATE]!);

    private readonly storeService: AbstractLzStoreService<LzStateKey.TEST_STATE> = inject(LzServiceInjectionTokensMap[LzStateKey.TEST_STATE]!);

    constructor(private service: TestService) {}

    public ngOnInit(): void {
        this.storeService.updateState(() => {
            return {
                dataState: UIDataState.LOADED,
            };
        });
    }
}
