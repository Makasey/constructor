import { Injectable, OnDestroy } from "@angular/core";
import { Query, Store, UpdateStateCallback, guid } from "@datorama/akita";
import { TableState } from "@core";
import { initialTableStore } from "../constants";

@Injectable()
export class TableStore extends Store<TableState> {
    constructor() {
        super(initialTableStore, { name: `lz-table-${guid()}` });
    }
}

@Injectable()
export class TableQuery extends Query<TableState> {
    constructor(protected tableStore: TableStore) {
        super(tableStore);
    }
}

@Injectable()
export class TableService implements OnDestroy {
    constructor(private store: TableStore) {}

    public ngOnDestroy(): void {
        this.store.destroy();
    }

    public updateState(updateStateCallback: UpdateStateCallback<TableState>): void {
        this.store.update(state => {
            return {
                ...updateStateCallback(state),
            };
        });
    }
}
