import { Product } from "./Context";

export enum SortingOptions {
  ALPHABETICAL_A_TO_Z = "ALPHABETICAL_A_TO_Z",
  ALPHABETICAL_Z_TO_A = "ALPHABETICAL_Z_TO_A",
  PRICE_ASCENDING = "PRICE_ASCENDING",
  PRICE_DESCENDING = "PRICE_DESCENDING",
}

export const filterProducts = (
  products: Product[],
  minPrice: number,
  maxPrice: number,
  titleFilter: string
) =>
  products.filter(
    ({ price, title }) =>
      price >= minPrice &&
      price <= maxPrice &&
      (titleFilter === "" ||
        title.toLowerCase().includes(titleFilter.toLowerCase()))
  );

export const sortProducts = (products: Product[], sortingOption: string) => {
  switch (sortingOption) {
    case SortingOptions.ALPHABETICAL_A_TO_Z:
      return products.sort((a, b) => a.title.localeCompare(b.title));
    case SortingOptions.ALPHABETICAL_Z_TO_A:
      return products.sort((a, b) => b.title.localeCompare(a.title));
    case SortingOptions.PRICE_ASCENDING:
      return products.sort((a, b) => a.price - b.price);
    case SortingOptions.PRICE_DESCENDING:
      return products.sort((a, b) => b.price - a.price);
    default:
      return products;
  }
};
