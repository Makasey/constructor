import { Injectable } from "@angular/core";
import { LzState } from "./lz.state";
import { LzStore } from "./lz.store";
import { Observable } from "rxjs";
import { Query } from "@datorama/akita";

@Injectable()
export class LzQuery extends Query<LzState> {
    constructor(protected store: LzStore) {
        super(store);
    }

    public getStatePart<K extends keyof LzState>(stateKey: K): LzState[K] {
        return this.getValue()[stateKey];
    }

    public selectStatePart<K extends keyof LzState>(stateKey: K): Observable<LzState[K]> {
        return this.store._select(state => state[stateKey]);
    }
}
