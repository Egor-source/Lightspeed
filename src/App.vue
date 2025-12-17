<script setup lang="ts">
import { useRoute } from "vue-router";
import NotificationContainer from "@/components/NotificationContainer.vue";
import { VueQueryDevtools } from "@tanstack/vue-query-devtools";

const route = useRoute();
const isDev = import.meta.env.VITE_NODE_ENV === "dev";
</script>

<template>
  <component :is="route.meta.layout || 'div'">
    <router-view />
  </component>
  <notification-container />
  <vue-query-devtools v-if="isDev" />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
