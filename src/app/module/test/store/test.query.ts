import {Query} from "@datorama/akita";
import {TestState} from "./types";
import {TestStore} from "./test.store";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class TestQuery extends Query<TestState> {

  constructor(protected store: TestStore) {
    super(store);
  }
}
