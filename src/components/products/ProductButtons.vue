<script setup lang="ts">
import { defineProps } from "vue";
import { useStore } from "vuex";
import { RootState } from "@/store/interfaces/RootState";
import { computed } from "vue";
import IconComponent from "@/components/UI/IconComponent.vue";
import ButtonComponent from "@/components/UI/ButtonComponent.vue";
import { ProductModel } from "@/services/products/models/ProductModel";
import { useCartActions } from "@/hooks/useCartActions";

const props = defineProps({
  product: {
    type: Object as () => ProductModel,
    required: true,
  },
});

const { addProduct, deleteProduct } = useCartActions();

const store = useStore<RootState>();

const isProductInStore = computed(() => store.getters["cart/isProductInStore"]);
const onBuy = () => {
  addProduct(props.product);
};

const onDelete = () => {
  deleteProduct(props.product);
};
</script>

<template>
  <div
    v-if="isProductInStore(product.id)"
    class="flex justify-between items-center"
  >
    <div class="font-bold text-green-500">In Cart</div>
    <button-component variant="red" @click.prevent="onDelete">
      <icon-component name="delete" size="24" />
    </button-component>
  </div>
  <button-component v-else @click.prevent="onBuy"> Buy </button-component>
</template>

<style scoped lang="scss"></style>
