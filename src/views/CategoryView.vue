<script setup lang="ts">
import CategoryCatalog from "@/components/CategoryCatalog.vue";
import { useRoute, useRouter } from "vue-router";
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
import SpinnerComponent from "@/components/UI/SpinnerComponent.vue";
import { computed, watch } from "vue";

const route = useRoute();
const router = useRouter();

const categoryId = computed(() => route.params.id);

const { data: categories, isLoading: categoriesIsLoading } = useQuery<
  PaginationDTO<CategoryDTO>,
  AxiosError,
  CategoryModel[]
>({
  queryKey: ["categories", categoryId],
  queryFn: () => fetchCategories(categoryId.value),
  select: mapCategoriesDtoToModels,
  staleTime: "static",
  retry: false,
});

const { data: products, isLoading: isProductsLoading } = useQuery<
  PaginationDTO<ProductDTO>,
  AxiosError,
  ProductModel[]
>({
  queryKey: ["products", categoryId],
  queryFn: () => fetchProducts({ categoryId: categoryId.value }),
  select: mapProductsDtoToModels,
  staleTime: "static",
  retry: false,
});

watch(products, () => {
  if (products.value?.length === 0) {
    router.push({ name: "404" });
  }
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
