<script setup lang="ts">
import { defineProps } from "vue";

defineProps({
  name: { type: String, required: true },
  size: { type: Number, default: 24 },
  count: { type: Number },
});
</script>

<template>
  <div
    class="icon"
    :style="{
      '--icon-size': `${size}px`,
    }"
  >
    <span class="material-symbols-outlined"> {{ name }} </span>
    <div class="icon__count" v-if="count > 0">
      <div v-if="count < 100">{{ count }}</div>
      <div v-else>99+</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.icon {
  width: var(--icon-size);
  height: var(--icon-size);
  position: relative;
  .material-symbols-outlined {
    font-size: var(--icon-size);
  }

  &__count {
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 50%;
    font-size: 10px;
    background: red;
    color: #fff;
    transform: translate(10px, -10px);
    min-width: 20px;
    aspect-ratio: 1/1;
    display: flex;
    padding: 2px;
    align-items: center;
    justify-content: center;
  }
}
</style>
