import { CollectItemFn } from "@shared-types/common/common";
import { describe, expect, test } from "@jest/globals";
import { hasIntersection } from "./array.utils";

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
