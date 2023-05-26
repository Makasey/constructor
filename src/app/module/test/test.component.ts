import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

import { Observable } from "rxjs";

import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

import { Tree } from "@components/ui/tree/tree.component";

import { Product } from "../../types";
import { TestService } from "./store";

export type ItemsWithId<T> = {
    items: T[];
    id: number;
};

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

    constructor(private service: TestService) {}

    public ngOnInit(): void {
        this.service.fetchProducts().pipe(untilDestroyed(this)).subscribe();
    }

    public updateProductList(): void {
        this.service.test();
    }
}
