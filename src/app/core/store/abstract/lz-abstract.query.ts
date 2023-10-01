import { LzState } from "@core";
import { Query } from "@datorama/akita";

export class LzAbstractQuery<T extends keyof LzState> extends Query<LzState[T]> {}
