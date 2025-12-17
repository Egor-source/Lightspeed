<script setup lang="ts">
import CategoryCatalog from "@/components/CategoryCatalog.vue";
import SpinnerComponent from "@/components/UI/SpinnerComponent.vue";
import { useQuery } from "@tanstack/vue-query";
import { PaginationDTO } from "@/services/dto/PaginationDTO";
import { CategoryDTO } from "@/services/categories/dto/CategoryDTO";
import { AxiosError } from "axios";
import { CategoryModel } from "@/services/categories/models/CategoryModel";
import { fetchCategories } from "@/services/categories/queries";
import { mapCategoriesDtoToModels } from "@/services/categories/mappers/mapCategoriesDtoToModels";
import { ProductDTO } from "@/services/products/dto/ProductDTO";
import { ProductModel } from "@/services/products/models/ProductModel";
import { fetchProducts } from "@/services/products/queries";
import { mapProductsDtoToModels } from "@/services/products/mappers/mapProductsDtoToModels";

const { data: categories, isLoading: categoriesIsLoading } = useQuery<
  PaginationDTO<CategoryDTO>,
  AxiosError,
  CategoryModel[]
>({
  queryKey: ["categories"],
  queryFn: () => fetchCategories(),
  select: mapCategoriesDtoToModels,
  staleTime: "static",
  retry: false,
});

const { data: products, isLoading: isProductsLoading } = useQuery<
  PaginationDTO<ProductDTO>,
  AxiosError,
  ProductModel[]
>({
  queryKey: ["products"],
  queryFn: () => fetchProducts(),
  select: mapProductsDtoToModels,
  staleTime: "static",
  retry: false,
});
</script>

<template>
  <div
    v-if="categoriesIsLoading || isProductsLoading"
    class="flex justify-center h-full items-center"
  >
    <spinner-component />
  </div>
  <category-catalog v-else :products="products" :categories="categories" />
</template>

<style scoped lang="scss"></style>
