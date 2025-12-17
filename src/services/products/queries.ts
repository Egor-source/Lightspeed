import { api } from "@/libs/api";
import { PaginationDTO } from "@/services/dto/PaginationDTO";
import { ProductDTO } from "@/services/products/dto/ProductDTO";
import { FetchProductArgs } from "@/services/products/interfaces/FetchProductArgs";

export const fetchProducts = async (
  args?: FetchProductArgs
): Promise<PaginationDTO<ProductDTO>> => {
  const response = await api.get<PaginationDTO<ProductDTO>>("products", {
    params: {
      category: args?.categoryId,
      productId: args?.productsIds ? args.productsIds.join(",") : "",
      responseFields:
        "total, count, offset, limit, items(id, name, imageUrl, price, defaultDisplayedPriceFormatted, description)",
    },
  });
  return response.data;
};
