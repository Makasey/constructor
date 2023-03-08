import { Injectable } from "@angular/core";

import { Store, StoreConfig } from "@datorama/akita";

import { LzState, createLZInitialState } from "./lz.state";

@Injectable()
@StoreConfig({
    name: "lz-root",
})
export class LzStore extends Store<LzState> {
    constructor() {
        super(createLZInitialState());
    }
}
