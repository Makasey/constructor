import { LzState } from "@core/store/lz.state";
import { Query } from "@datorama/akita";

export class LzAbstractQuery<T extends keyof LzState> extends Query<LzState[T]> {}
