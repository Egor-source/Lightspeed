import { api } from "@/libs/api";
import { PaginationDTO } from "@/services/dto/PaginationDTO";
import { CategoryDTO } from "@/services/categories/dto/CategoryDTO";

export const fetchCategories = async (
  parentId = 0
): Promise<PaginationDTO<CategoryDTO>> => {
  const response = await api.get<PaginationDTO<CategoryDTO>>("categories", {
    params: {
      parent: parentId,
      responseFields:
        "total, count, offset, limit, items(id, name, imageUrl, alt)",
    },
  });
  return response.data;
};
