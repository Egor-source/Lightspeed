<script setup lang="ts">
import { useStore } from "vuex";
import { RootState } from "@/store/interfaces/RootState";
import { computed, onMounted, watch } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { PaginationDTO } from "@/services/dto/PaginationDTO";
import { ProductDTO } from "@/services/products/dto/ProductDTO";
import { AxiosError } from "axios";
import { ProductModel } from "@/services/products/models/ProductModel";
import { fetchProducts } from "@/services/products/queries";
import { mapProductsDtoToModels } from "@/services/products/mappers/mapProductsDtoToModels";
import ImgComponent from "@/components/UI/ImgComponent.vue";
import SpinnerComponent from "@/components/UI/SpinnerComponent.vue";
import ButtonComponent from "@/components/UI/ButtonComponent.vue";
import IconComponent from "@/components/UI/IconComponent.vue";
import { useCartActions } from "@/hooks/useCartActions";
import { useRouter } from "vue-router";

const store = useStore<RootState>();
const router = useRouter();
const { deleteProduct, clearCart } = useCartActions();

const productsCount = computed(() => store.getters["cart/getProductsCount"]);

const {
  data: products,
  isLoading: isProductsLoading,
  refetch,
} = useQuery<PaginationDTO<ProductDTO>, AxiosError, ProductModel[]>({
  queryKey: ["cart"],
  queryFn: () =>
    fetchProducts({ productsIds: store.getters["cart/getProducts"] }),
  select: mapProductsDtoToModels,
  staleTime: "static",
  retry: false,
  enabled: productsCount.value > 0,
});

const totalPrice = computed(() => {
  const price = products.value?.reduce((acc, { price }) => {
    acc += price;
    return acc;
  }, 0);
  return price.toFixed(2);
});

const placeOrder = () => {
  store.commit("notification/addNotification", {
    type: "success",
    text: "Your order has been successfully placed! Enjoy your new item.",
  });
  clearCart();
  router.push("/");
};

onMounted(() => {
  if (
    !isProductsLoading.value &&
    products.value.length !== productsCount.value
  ) {
    refetch();
  }
});
</script>

<template>
  <div v-if="isProductsLoading" class="flex justify-center h-full items-center">
    <spinner-component />
  </div>
  <div v-else class="h-full">
    <div
      v-if="productsCount === 0"
      class="h-full flex justify-center items-center"
    >
      <div class="text-center">
        <div class="font-bold text-2xl">Oops! Your cart is empty.</div>
        <router-link to="/">
          <div class="text-blue-500 font-bold">
            Add some items to your cart to get started.
          </div>
        </router-link>
      </div>
    </div>
    <div v-else class="grid grid-cols-1 grid-cols-4 pb-13 xl:pb-0">
      <div class="col-span-full xl:col-span-3">
        <div
          v-for="product in products"
          :key="product.id"
          class="md:flex gap-5 p-5 border-b border-gray-300"
        >
          <img-component
            :src="product.imageUrl"
            class="max-w-60 md:max-w-30 rounded-[0.5rem] mx-auto md:mx-0 mb-5 md:mb-0"
            aspect-ratio="2/3"
          />
          <div class="mb-3 md:mb-0">
            <div class="font-bold text-xl">{{ product.name }}</div>
            <div
              class="line-clamp-4 max-w-xl mb-3"
              v-html="product.description"
            />
            <div class="flex gap-5 items-center">
              <div class="font-bold text-xl">{{ product.formattedPrice }}</div>
              <button-component
                variant="red"
                @click="() => deleteProduct(product)"
              >
                <icon-component name="delete" />
              </button-component>
            </div>
          </div>
        </div>
      </div>
      <div
        class="col-span-full px-[10px] xl:p-0 xl:col-span-1 fixed bottom-0 left-0 xl:static xl:bottom-auto xl:left-auto w-full bg-white border-t xl:border-none border-gray-300"
      >
        <div
          class="container mx-auto py-3 px-5 xl:p-0 flex gap-3 justify-between items-center"
        >
          <div class="font-bold text-xl">Total price: € {{ totalPrice }}</div>
          <button-component @click="placeOrder"> Place order </button-component>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
