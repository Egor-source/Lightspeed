<script setup lang="ts">
import CardComponent from "@/components/UI/CardComponent.vue";
import { defineProps } from "vue";
import { CategoryModel } from "@/services/categories/models/CategoryModel";
import ImgComponent from "@/components/UI/ImgComponent.vue";

defineProps({
  categories: {
    type: Array as () => CategoryModel[],
    required: true,
  },
});
</script>

<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
  >
    <router-link
      v-for="category in categories"
      :key="category.id"
      :to="{ name: 'category', params: { id: category.id } }"
    >
      <card-component>
        <div>
          <img-component
            class="rounded-[0.5rem] mb-3"
            :src="category.imageUrl"
            :alt="category.alt"
            aspect-ratio="4/3"
          />
          <div class="font-bold text-lg">{{ category.name }}</div>
        </div>
      </card-component>
    </router-link>
  </div>
</template>

<style scoped lang="scss"></style>
