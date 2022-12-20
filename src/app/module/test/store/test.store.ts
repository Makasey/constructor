import {Injectable} from "@angular/core";
import {Store, StoreConfig} from "@datorama/akita";
import {TestState, TestStateName, createInitialState} from "./types";

@Injectable({
    providedIn: "root",
})
@StoreConfig({
    name: TestStateName,
})
export class TestStore extends Store<TestState> {
    constructor() {
        super(createInitialState());
    }
}
