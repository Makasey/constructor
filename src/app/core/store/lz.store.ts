import { Injectable } from "@angular/core";
import { LzState, createLZInitialState } from "./lz.state";
import { Store, StoreConfig } from "@datorama/akita";

@Injectable()
@StoreConfig({
    name: "lz-root",
})
export class LzStore extends Store<LzState> {
    constructor() {
        super(createLZInitialState());
    }
}
