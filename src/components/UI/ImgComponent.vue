<script setup lang="ts">
import { defineProps, PropType, ref, watch } from "vue";
import notFoundImage from "@/assets/not-found-image.png";

const props = defineProps({
  src: {
    type: String,
    default: notFoundImage,
  },
  alt: { type: String, default: "" },
  aspectRatio: { type: String, default: "16/9" },
  objectFit: {
    type: String as PropType<
      "cover" | "contain" | "fill" | "none" | "scale-down"
    >,
    default: "cover",
  },
  showSkeleton: { type: Boolean, default: true },
  fallbackSrc: { type: String, default: notFoundImage },
});

const isLoaded = ref(false);
const hasError = ref(false);

watch(
  () => props.src,
  () => {
    isLoaded.value = false;
    hasError.value = false;
  }
);

const onLoad = () => {
  isLoaded.value = true;
};

const onError = () => {
  hasError.value = true;
  isLoaded.value = true;
};
</script>

<template>
  <div
    class="image"
    :style="{
      '--aspect-ratio': aspectRatio,
    }"
  >
    <div v-if="showSkeleton && !isLoaded" class="image__skeleton" />
    <img
      v-show="isLoaded"
      :src="hasError ? fallbackSrc : src"
      :alt="alt"
      :style="{ objectFit }"
      @load="onLoad"
      @error="onError"
    />
  </div>
</template>

<style scoped lang="scss">
.image {
  position: relative;
  overflow: hidden;
  background-color: #f3f4f6;
  aspect-ratio: var(--aspect-ratio);
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
}

.image img {
  width: 100%;
  height: 100%;
  display: block;
}

.image__skeleton {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 37%, #e5e7eb 63%);
  background-size: 400% 100%;
  animation: shimmer 1.4s ease infinite;
}

@keyframes shimmer {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: -100% 0;
  }
}
</style>
