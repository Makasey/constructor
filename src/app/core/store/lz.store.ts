import { Injectable } from "@angular/core";

import { Store, StoreConfig } from "@datorama/akita";

import { LzState, createLZInitialState } from "@core/store";

@Injectable()
@StoreConfig({
    name: "lz-root",
})
export class LzStore extends Store<LzState> {
    constructor() {
        super(createLZInitialState());
    }
}
