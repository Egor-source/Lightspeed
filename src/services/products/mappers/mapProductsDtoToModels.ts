import { ProductDTO } from "@/services/products/dto/ProductDTO";
import { ProductModel } from "@/services/products/models/ProductModel";
import { PaginationDTO } from "@/services/dto/PaginationDTO";

export const mapProductsDtoToModels = (
  productsDto: PaginationDTO<ProductDTO>
): ProductModel[] => {
  return productsDto.items.map<ProductModel>(
    ({
      id,
      name,
      imageUrl,
      price,
      defaultDisplayedPriceFormatted,
      description,
    }) => ({
      id,
      name,
      imageUrl,
      price,
      formattedPrice: defaultDisplayedPriceFormatted,
      description,
    })
  );
};
