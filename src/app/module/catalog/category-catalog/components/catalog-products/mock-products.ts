import { Product } from "@shared-types/index";

export const mockProducts: Product[] = [
    {
        id: 1,
        title: "title1",
        price: 11,
        salePrice: 5,
        description: "description1",
        count: 1,
        currencies: [
            {
                id: 1,
                code: "currencyCode1",
                symbol: "currencySymbol1",
            },
        ],
        categories: [
            {
                value: "categories",
                id: 1,
            },
        ],
        options: [
            {
                id: 1,
                name: "name1",
                value: "value1",
            },
        ],
        photos: [
            {
                id: 1,
                fileName: "fileName",
                path: "path",
                size: 1,
            },
        ],
    },
    {
        id: 2,
        title: "title2",
        price: 22,
        salePrice: 10,
        description: "description2",
        count: 1,
        currencies: [
            {
                id: 1,
                code: "currencyCode2",
                symbol: "currencySymbol2",
            },
        ],
        categories: [
            {
                value: "categories2",
                id: 1,
            },
        ],
        options: [
            {
                id: 1,
                name: "name2",
                value: "value2",
            },
        ],
        photos: [
            {
                id: 1,
                fileName: "fileNam2",
                path: "pat2",
                size: 1,
            },
        ],
    },
    {
        id: 3,
        title: "title3",
        price: 33,
        salePrice: 15,
        description: "description3",
        count: 1,
        currencies: [
            {
                id: 1,
                code: "currencyCode3",
                symbol: "currencySymbol4",
            },
        ],
        categories: [
            {
                value: "categories3",
                id: 1,
            },
        ],
        options: [
            {
                id: 1,
                name: "name3",
                value: "value3",
            },
        ],
        photos: [
            {
                id: 1,
                fileName: "fileNam3",
                path: "pat3",
                size: 1,
            },
        ],
    },
    {
        id: 4,
        title: "title4",
        price: 44,
        salePrice: 20,
        description: "description4",
        count: 1,
        currencies: [
            {
                id: 1,
                code: "currencyCode4",
                symbol: "currencySymbol4",
            },
        ],
        categories: [
            {
                value: "categories4",
                id: 1,
            },
        ],
        options: [
            {
                id: 1,
                name: "name4",
                value: "value4",
            },
        ],
        photos: [
            {
                id: 1,
                fileName: "fileNam4",
                path: "pat4",
                size: 1,
            },
        ],
    },
    {
        id: 5,
        title: "title5",
        price: 44,
        salePrice: 20,
        description: "description5",
        count: 1,
        currencies: [
            {
                id: 1,
                code: "currencyCode5",
                symbol: "currencySymbol5",
            },
        ],
        categories: [
            {
                value: "categories5",
                id: 1,
            },
        ],
        options: [
            {
                id: 1,
                name: "name5",
                value: "value5",
            },
        ],
        photos: [
            {
                id: 1,
                fileName: "fileNam5",
                path: "pat5",
                size: 1,
            },
        ],
    },
];
