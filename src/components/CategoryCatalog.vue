<script setup lang="ts">
import { defineProps } from "vue";
import { CategoryModel } from "@/services/categories/models/CategoryModel";
import { ProductModel } from "@/services/products/models/ProductModel";
import ProductsList from "@/components/products/ProductsList.vue";
import CategoriesList from "@/components/categories/CategoriesList.vue";

const props = defineProps({
  categories: {
    type: Array as () => CategoryModel[],
    required: true,
  },
  products: {
    type: Array as () => ProductModel[],
    required: true,
  },
});
</script>

<template>
  <div>
    <div v-if="categories?.length > 0" class="mb-10">
      <div class="font-bold text-2xl mb-2">Categories</div>
      <categories-list :categories="categories" />
    </div>
    <div>
      <div class="font-bold text-2xl mb-2">Products</div>
      <products-list :products="products" />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
