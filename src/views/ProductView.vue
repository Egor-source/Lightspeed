<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { PaginationDTO } from "@/services/dto/PaginationDTO";
import { ProductDTO } from "@/services/products/dto/ProductDTO";
import { AxiosError } from "axios";
import { ProductModel } from "@/services/products/models/ProductModel";
import { fetchProducts } from "@/services/products/queries";
import { mapProductDtoToModel } from "@/services/products/mappers/mapProductDtoToModel";
import SpinnerComponent from "@/components/UI/SpinnerComponent.vue";
import ImgComponent from "@/components/UI/ImgComponent.vue";
import ProductButtons from "@/components/products/ProductButtons.vue";

const route = useRoute();
const productId = computed(() => route.params.id);

const { data: product, isLoading: isProductsLoading } = useQuery<
  PaginationDTO<ProductDTO>,
  AxiosError,
  ProductModel
>({
  queryKey: ["product", productId],
  queryFn: () => fetchProducts({ productsIds: [productId.value] }),
  select: mapProductDtoToModel,
  staleTime: "static",
  retry: false,
});
</script>

<template>
  <div v-if="isProductsLoading" class="flex justify-center h-full items-center">
    <spinner-component />
  </div>
  <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-15">
    <img-component
      class="mx-auto max-w-sm rounded-[0.5rem]"
      aspect-ratio="2/3"
      :src="product.imageUrl"
    />
    <div>
      <div class="font-bold text-3xl mb-5">{{ product.name }}</div>
      <div class="text-s mb-5" v-html="product.description" />
      <div class="font-bold text-3xl mb-5">{{ product.formattedPrice }}</div>
      <product-buttons :product="product" />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
