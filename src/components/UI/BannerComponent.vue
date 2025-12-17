<script setup lang="ts">
import { defineEmits, defineProps, PropType } from "vue";
import ButtonComponent from "@/components/UI/ButtonComponent.vue";
import IconComponent from "@/components/UI/IconComponent.vue";

defineProps({
  showCloseIcon: { type: Boolean, default: true },
  type: {
    type: String as PropType<"error" | "success" | "warning">,
    default: "success",
  },
});

const emit = defineEmits<{
  (e: "remove"): void;
}>();

const remove = () => {
  emit("remove");
};
</script>

<template>
  <div
    :class="[
      'banner',
      {
        banner_success: type === 'success',
        banner_error: type === 'error',
        banner_warning: type === 'warning',
      },
    ]"
  >
    <slot />
    <button-component v-if="showCloseIcon" variant="none" @click="remove">
      <icon-component name="close" :size="15" />
    </button-component>
  </div>
</template>

<style scoped lang="scss">
.banner {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);

  &_success {
    background: #2f855a;
    color: #e6fffa;
  }

  &_error {
    background: #c53030;
    color: #fff5f5;
  }

  &_warning {
    background: #d69e2e;
    color: #fffff0;
  }
}
</style>
