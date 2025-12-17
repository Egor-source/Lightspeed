import { useStore } from "vuex";
import { RootState } from "@/store/interfaces/RootState";
import { useQueryClient } from "@tanstack/vue-query";
import { PaginationDTO } from "@/services/dto/PaginationDTO";
import { ProductDTO } from "@/services/products/dto/ProductDTO";
import { ProductModel } from "@/services/products/models/ProductModel";

export const useCartActions = () => {
  const store = useStore<RootState>();
  const queryClient = useQueryClient();

  const addProduct = (product: ProductModel) => {
    store.commit("cart/addProduct", product);
    queryClient.setQueryData<PaginationDTO<ProductDTO>>(["cart"], (old) => {
      const cacheProduct: ProductDTO = {
        id: product.id,
        name: product.name,
        imageUrl: product.imageUrl,
        price: product.price,
        defaultDisplayedPriceFormatted: product.formattedPrice,
        description: product.description,
      };
      if (!old) {
        return {
          count: 1,
          total: 1,
          offset: 0,
          limit: 100,
          items: [cacheProduct],
        };
      }
      return {
        ...old,
        count: old.count + 1,
        total: old.total + 1,
        items: [...old.items, cacheProduct],
      };
    });
  };

  const deleteProduct = (product: ProductModel) => {
    store.commit("cart/deleteProduct", product.id);
    queryClient.setQueryData<PaginationDTO<ProductDTO>>(["cart"], (old) => {
      if (!old) return;
      const newItems = old.items.filter(({ id }) => id !== product.id);
      return {
        ...old,
        count: old.count - 1,
        total: old.total - 1,
        items: newItems,
      };
    });
  };

  const clearCart = () => {
    store.commit("cart/clearCart");
    queryClient.removeQueries({ queryKey: ["cart"], exact: true });
  };

  return { addProduct, deleteProduct, clearCart };
};
