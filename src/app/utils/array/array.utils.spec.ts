import { CollectItemFn } from "@shared-types/common/common";
import { describe, expect, test } from "@jest/globals";
import { hasIntersection, isArrayEquals } from "./array.utils";

const TEST_NAME = "hasIntersection";

describe(`[MODULE: ${TEST_NAME}] tests`, () => {
    test(`${TEST_NAME} test with empty arrays`, () => {
        const destination: string[] = [];
        const source: string[] = [];

        expect(hasIntersection({ destination, source })).toBeFalsy();
    });

    test(`${TEST_NAME} test with two strings array`, () => {
        const source = ["admin", "user", "moderator"];
        const destination = ["user"];

        expect(hasIntersection({ source, destination })).toBeTruthy();
    });

    test(`${TEST_NAME} test with two strings array`, () => {
        const source = ["admin", "user", "moderator"];
        const destination = ["user"];

        expect(hasIntersection({ source: destination, destination: source })).toBeTruthy();
    });

    test(`${TEST_NAME} test with two strings array`, () => {
        const source = ["admin", "user", "moderator"];
        const destination = ["hello world"];

        expect(hasIntersection({ source, destination })).toBeFalsy();
    });

    test(`${TEST_NAME} test with two strings array`, () => {
        const source = ["admin", "user", "moderator"];
        const destination = ["hello world"];

        expect(hasIntersection({ source: destination, destination: source })).toBeFalsy();
    });

    test(`${TEST_NAME} test with array of strings and array of objects`, () => {
        const source = [
            { value: "admin", id: 1 },
            { value: "user", id: 2 },
            { value: "moderator", id: 3 },
        ];
        const destination = ["user"];

        expect(hasIntersection({ source, destination })).toBeFalsy();
    });

    test(`${TEST_NAME} test with array of strings and array of objects`, () => {
        const source = [
            { value: "admin", id: 1 },
            { value: "user", id: 2 },
            { value: "moderator", id: 3 },
        ];
        const destination = ["user"];
        const sourceCollectFn: CollectItemFn<{ value: string; id: number }> = sourceItem => sourceItem.value;

        expect(hasIntersection({ source, destination, sourceCollectFn })).toBeTruthy();
    });

    test(`${TEST_NAME} test with multiple arrays of objects`, () => {
        const source = [
            { value: "admin", id: 1 },
            { value: "user", id: 2 },
            { value: "moderator", id: 3 },
        ];
        const destination = [{ role: "user" }];
        const sourceCollectFn: CollectItemFn<{ value: string; id: number }> = sourceItem => sourceItem.value;
        const destinationCollectFn: CollectItemFn<{ role: string }> = sourceItem => sourceItem.role;

        expect(hasIntersection({ source, destination, sourceCollectFn, destinationCollectFn })).toBeTruthy();
    });
});

describe(`[MODULE: isArrayEquals}] tests`, () => {
    test(`isArrayEquals test with empty arrays`, () => {
        const destination: string[] = [];
        const source: string[] = [];

        expect(isArrayEquals(destination, source)).toBeTruthy();
    });

    test(`isArrayEquals test with different arrays`, () => {
        const destination: number[] = [123];
        const source: number[] = [42343243, 432432, 4324, 234324, 42342];

        expect(isArrayEquals(destination, source)).toBeFalsy();
    });

    test(`isArrayEquals test with object equal arrays`, () => {
        const destination: unknown[] = [{ name: "Alex", key: "something" }];
        const source: unknown[] = [{ name: "Alex", key: "something" }];

        expect(isArrayEquals(destination, source)).toBeTruthy();
    });

    test(`isArrayEquals test with null arrays`, () => {
        const destination: unknown[] = [null];
        const source: unknown[] = [null];

        expect(isArrayEquals(destination, source)).toBeTruthy();
    });

    test(`isArrayEquals test with iterable entities(sets)`, () => {
        const destination = new Set([1, 2, 3]);
        const source = new Set([1, 2, 3]);

        expect(isArrayEquals(destination, source)).toBeTruthy();
    });

    test(`isArrayEquals test with iterable entities(maps)`, () => {
        const destination = new Map([
            [1, 2],
            [3, 4],
        ]);

        const source = new Map([
            [1, 2],
            [3, 4],
        ]);

        expect(isArrayEquals(destination, source)).toBeTruthy();
    });

    test(`isArrayEquals test with nulls`, () => {
        const destination = null;

        const source = null;

        expect(isArrayEquals(destination as any, source as any)).toBeFalsy();
    });

    test(`isArrayEquals test with numbers`, () => {
        const destination = 1;

        const source = 2;

        expect(isArrayEquals(destination as any, source as any)).toBeTruthy();
    });
});
