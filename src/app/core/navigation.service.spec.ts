import { TestBed } from "@angular/core/testing";

import { AbstractNavigationService, NavigationService } from "@core";
import { RouteKey } from "@shared-types";

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
        const pathName = "" as RouteKey;
        const expectedResult = "";

        expect(service.buildLink(pathName)).toEqual(expectedResult);
    });

    it(`[${TEST_TAG}] build link method should return empty string when passed null`, () => {
        const pathName = null as unknown as RouteKey;
        const expectedResult = "";

        expect(service.buildLink(pathName)).toEqual(expectedResult);
    });

    it(`[${TEST_TAG}] build link method should return empty string when passed non existing key`, () => {
        const pathName = "1234" as RouteKey;
        const expectedResult = "";

        expect(service.buildLink(pathName)).toEqual(expectedResult);
    });

    it(`[${TEST_TAG}] Build link method should return roses catalog link`, () => {
        const pathIds = { campaignId: "123" };
        const pathName = RouteKey.CAMPAIGN_EDITOR;
        const expectedResult = "/builder/123/editor";
        expect(service.buildLink(pathName, pathIds)).toEqual(expectedResult);
    });
});
