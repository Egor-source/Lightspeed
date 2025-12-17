import { CartState } from "@/store/interfaces/CartState";
import { CART_PRODUCTS } from "@/store/cart/constants";
import { ProductModel } from "@/services/products/models/ProductModel";

export const addProduct = (state: CartState, product: ProductModel) => {
  state.products.push(product.id);
  localStorage.setItem(CART_PRODUCTS, JSON.stringify(state.products));
};

export const deleteProduct = (state: CartState, productId: number) => {
  state.products = state.products.filter((id) => id !== productId);
  localStorage.setItem(CART_PRODUCTS, JSON.stringify(state.products));
};

export const clearCart = (state: CartState) => {
  state.products = [];
  localStorage.removeItem(CART_PRODUCTS);
};
