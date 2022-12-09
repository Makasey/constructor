import {Store, StoreConfig} from "@datorama/akita";
import {createInitialState, TestState, TestStateName} from "./types";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
@StoreConfig({
  name: TestStateName,
})
export class TestStore extends Store<TestState> {
  constructor() {
    super(createInitialState());
  }
}
