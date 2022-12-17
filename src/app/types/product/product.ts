export type Product = {
  id: number;
  title: string;
  price: number;
  salePrice: number | null;
  description: string;
  count: number;
  currencies: ProductCurrency[];
  categories: ProductCategory[];
  options: ProductOption[];
  photos: ProductPhoto[];
}

export type ProductCurrency = {
  id: number;
  currencyCode: string;
  currencySymbol: string;
}

export type ProductCategory = {
  value: string;
  id: number;
}

export type ProductOption = {
  id: number;
  name: string;
  value: string | number;
}

export type ProductPhoto = {
  id: number;
  fileName: string;
  path: string;
  size: number;
}
