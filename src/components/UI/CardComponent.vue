<script setup lang="ts">
import { defineProps } from "vue";

defineProps({
  shadow: { type: Boolean, default: true },
  padding: { type: String, default: "1rem" },
  radius: { type: String, default: "0.5rem" },
});
</script>

<template>
  <div class="card">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.card {
  background-color: white;
  padding: var(--card-padding, 1rem);
  border-radius: var(--card-radius, 1rem);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease;
  height: 100%;
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
}
</style>
