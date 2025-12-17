import { CartState } from "@/store/interfaces/CartState";

export const getProducts = (state: CartState) => state.products;
export const getProductsCount = (state: CartState) => state.products.length;

export const isProductInStore = (state: CartState) => (productId: number) =>
  state.products.includes(productId);
