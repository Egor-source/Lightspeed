import { CategoryModel } from "@/services/categories/models/CategoryModel";
import { PaginationDTO } from "@/services/dto/PaginationDTO";
import { CategoryDTO } from "@/services/categories/dto/CategoryDTO";

export const mapCategoriesDtoToModels = (
  categoriesDto: PaginationDTO<CategoryDTO>
): CategoryModel[] => {
  return categoriesDto.items.map<CategoryModel>(
    ({ id, name, imageUrl, alt }) => ({
      id,
      name,
      imageUrl,
      alt: alt.main,
    })
  );
};
