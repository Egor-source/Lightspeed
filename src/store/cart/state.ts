import { CartState } from "@/store/interfaces/CartState";
import { CART_PRODUCTS } from "@/store/cart/constants";

const state = (): CartState => {
  const itemsString = localStorage.getItem(CART_PRODUCTS);
  const products: number[] = itemsString ? JSON.parse(itemsString) : [];

  return { products };
};

export default state;
