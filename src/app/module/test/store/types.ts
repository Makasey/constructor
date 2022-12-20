import { Product } from "../../../types";

export interface TestState {
    products: Product[];
}

export const TestStateName = "testState";

export const createInitialState: () => TestState = () => {
    return {
        products: [],
    };
};
