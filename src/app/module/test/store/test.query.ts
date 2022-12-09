import {Injectable} from "@angular/core";
import {Query} from "@datorama/akita";
import {TestState} from "./types";
import {TestStore} from "./test.store";

@Injectable({
    providedIn: "root",
})
export class TestQuery extends Query<TestState> {

    constructor(protected store: TestStore) {
        super(store);
    }
}
