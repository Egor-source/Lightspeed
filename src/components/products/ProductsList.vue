<script setup lang="ts">
import { defineProps } from "vue";
import { ProductModel } from "@/services/products/models/ProductModel";
import CardComponent from "@/components/UI/CardComponent.vue";
import ImgComponent from "@/components/UI/ImgComponent.vue";
import ProductButtons from "@/components/products/ProductButtons.vue";

defineProps({
  products: {
    type: Array as () => ProductModel[],
    required: true,
  },
});
</script>

<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
  >
    <router-link
      v-for="product in products"
      :key="product.id"
      :to="{ name: 'product', params: { id: product.id } }"
    >
      <card-component>
        <div class="h-full flex flex-col justify-between">
          <div>
            <img-component
              :src="product.imageUrl"
              class="rounded-[0.5rem] mb-3"
              aspect-ratio="2/3"
            />
            <span class="font-bold text-lg">{{ product.name }}</span>
            <div class="mb-5">{{ product.formattedPrice }}</div>
          </div>
          <product-buttons :product="product" />
        </div>
      </card-component>
    </router-link>
  </div>
</template>

<style scoped lang="scss"></style>
