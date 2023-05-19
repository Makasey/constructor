import { AbstractNavigationService, NavigationService } from "./navigation.service";
import { TestBed } from "@angular/core/testing";

describe("Navigation Service Test", () => {
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

    it("[Navigation Service] Build link method should return empty string", () => {
        expect(service.buildLink("1234")).toEqual("");
    });

    it("[Navigation Service] Build link method should return empty string", () => {
        expect(service.buildLink("")).toEqual("");
    });

    it("[Navigation Service] Build link method should return roses catalog link", () => {
        const pathIds = { categoryId: "roses" };
        const pathName = "catalog";
        const expectedResult = "/catalog/roses";
        expect(service.buildLink(pathName, pathIds)).toEqual(expectedResult);
    });

    it("[Navigation Service] Build link method should return rose product link", () => {
        const pathIds = { categoryId: "roses", productId: "rose" };
        const pathName = "product";
        const expectedResult = "/catalog/roses/rose";

        expect(service.buildLink(pathName, pathIds)).toEqual(expectedResult);
    });
});
