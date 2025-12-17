import { PaginationDTO } from "@/services/dto/PaginationDTO";
import { ProductDTO } from "@/services/products/dto/ProductDTO";
import { ProductModel } from "@/services/products/models/ProductModel";

export const mapProductDtoToModel = (
  productDto: PaginationDTO<ProductDTO>
): ProductModel => {
  const [product] = productDto.items;
  return {
    id: product.id,
    name: product.name,
    imageUrl: product.imageUrl,
    price: product.price,
    formattedPrice: product.defaultDisplayedPriceFormatted,
    description: product.description,
  };
};
