export type Product = {
    id: number;
    title: string;
    price: number;
    salePrice: number | null;
    description: string;
    count: number;
    currencies: Currency[];
    categories: ProductCategory[];
    options: ProductOption[];
    photos: ProductPhoto[];
};

export type Currency = {
    id: number;
    code: string;
    symbol: string;
};

export type ProductCategory = {
    value: string;
    id: number;
};

export type ProductOption = {
    id: number;
    name: string;
    value: string | number;
};

export type ProductPhoto = {
    id: number;
    fileName: string;
    path: string;
    size: number;
};
