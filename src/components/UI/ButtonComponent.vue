<script setup lang="ts">
import { defineProps } from "vue";

defineProps({
  variant: {
    type: String as () => "primary" | "secondary" | "outline" | "red" | "none",
    default: "primary",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <button
    :class="['btn', `btn--${variant}`, { 'btn--disabled': disabled }]"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<style scoped lang="scss">
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  font-weight: 500;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &--disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &--primary {
    background-color: #3b82f6;
    color: white;

    &:hover:not(.btn--disabled) {
      background-color: #2563eb;
    }
  }

  &--secondary {
    background-color: #e5e7eb;
    color: #111827;

    &:hover:not(.btn--disabled) {
      background-color: #d1d5db;
    }
  }

  &--outline {
    background-color: transparent;
    border: 2px solid #3b82f6;
    color: #3b82f6;

    &:hover:not(.btn--disabled) {
      background-color: #3b82f6;
      color: white;
    }
  }
  &--red {
    background-color: #e5484d;
    color: #fff;

    &:hover:not(.btn--disabled) {
      background-color: #dc3d43;
    }
  }
  &--none {
    padding: 0;
  }
}
</style>
