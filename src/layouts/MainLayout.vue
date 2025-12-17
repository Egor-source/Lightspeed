<script setup lang="ts">
import IconComponent from "@/components/UI/IconComponent.vue";
import { useStore } from "vuex";
import { RootState } from "@/store/interfaces/RootState";
import { computed } from "vue";
import ButtonComponent from "@/components/UI/ButtonComponent.vue";
import { useRoute, useRouter } from "vue-router";

const store = useStore<RootState>();
const productsCount = computed(() => store.getters["cart/getProductsCount"]);

const router = useRouter();
const route = useRoute();

const previousPath = computed(() => store.getters["navigation/getLastPath"]);
const goBack = () => {
  if (previousPath.value) {
    router.push(previousPath.value);
    return;
  }
  router.push("/");
};
</script>

<template>
  <div class="flex flex-col h-full">
    <header
      class="w-full flex fixed z-2 justify-center bg-white p-[10px] shadow-sm"
    >
      <div class="container flex justify-between align-center">
        <router-link to="/" class="router-link router-link_no-active">
          <img src="@/assets/logo.svg" alt="logo" />
        </router-link>
        <router-link to="/cart" class="router-link">
          <IconComponent name="shopping_cart" :count="productsCount" />
        </router-link>
      </div>
    </header>
    <main class="w-full flex-1 pt-[70px] p-[10px] flex justify-center">
      <div class="container flex flex-col">
        <div>
          <button-component
            v-if="!route.meta.hideBack"
            variant="none"
            class="mb-5"
            @click="goBack"
          >
            <div class="flex">
              <icon-component name="arrow_back" />
              <span class="font-bold">Back</span>
            </div>
          </button-component>
        </div>
        <slot />
      </div>
    </main>
  </div>
</template>
<style scoped lang="scss"></style>
