import { TestBed } from "@angular/core/testing";

import { AbstractNavigationService, NavigationService } from "./navigation.service";

const TEST_TAG = "Navigation Service";

describe(`${TEST_TAG} Test`, () => {
    let service: AbstractNavigationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: AbstractNavigationService,
                    useClass: NavigationService,
                },
            ],
        });
        service = TestBed.inject(AbstractNavigationService);
    });

    it(`[${TEST_TAG}] Build link method should return empty string when provided empty key`, () => {
        const pathName = "";
        const expectedResult = "";

        expect(service.buildLink(pathName)).toEqual(expectedResult);
    });

    it(`[${TEST_TAG}] build link method should return empty string when passed null`, () => {
        const pathName = null as unknown as string;
        const expectedResult = "";

        expect(service.buildLink(pathName)).toEqual(expectedResult);
    });

    it(`[${TEST_TAG}] build link method should return empty string when passed non existing key`, () => {
        const pathName = "1234";
        const expectedResult = "";

        expect(service.buildLink(pathName)).toEqual(expectedResult);
    });

    it(`[${TEST_TAG}] Build link method should return roses catalog link`, () => {
        const pathIds = { categoryId: "roses" };
        const pathName = "catalog";
        const expectedResult = "/home/catalog/roses";
        expect(service.buildLink(pathName, pathIds)).toEqual(expectedResult);
    });

    it(`[${TEST_TAG}] Build link method should return rose product link`, () => {
        const pathIds = { categoryId: "roses", productId: "rose" };
        const pathName = "product";
        const expectedResult = "/home/catalog/roses/rose";

        expect(service.buildLink(pathName, pathIds)).toEqual(expectedResult);
    });
});
