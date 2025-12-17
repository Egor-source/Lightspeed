<script setup lang="ts">
import { defineProps } from "vue";

defineProps({
  thickness: { type: Number, default: 3 },
  size: { type: Number, default: 32 },
  color: { type: String, default: "#6b7280" },
});
</script>

<template>
  <div
    class="spinner"
    :style="{
      '--spinner-width': `${size}px`,
      '--spinner-height': `${size}px`,
      '--spinner-borderWidth': `${thickness}px`,
      '--spinner-borderTopColor': color,
    }"
  />
</template>

<style scoped lang="scss">
.spinner {
  width: var(--spinner-width);
  height: var(--spinner-height);
  border-width: var(--spinner-borderWidth);
  border-style: solid;
  border-color: var(--spinner-borderTopColor) rgba(0, 0, 0, 0.15)
    rgba(0, 0, 0, 0.15);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  box-sizing: border-box;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
