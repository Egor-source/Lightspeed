import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import CatalogView from "@/views/CatalogView.vue";
import MainLayout from "@/layouts/MainLayout.vue";
import CartView from "@/views/CartView.vue";
import ProductView from "@/views/ProductView.vue";
import CategoryView from "@/views/CategoryView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import { useStore } from "vuex";
import { RootState } from "@/store/interfaces/RootState";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "main",
    component: CatalogView,
    meta: { layout: MainLayout, hideBack: true },
  },
  {
    path: "/cart",
    name: "cart",
    component: CartView,
    meta: { layout: MainLayout },
  },
  {
    path: "/product/:id",
    name: "product",
    component: ProductView,
    meta: { layout: MainLayout },
  },
  {
    path: "/category/:id",
    name: "category",
    component: CategoryView,
    meta: { layout: MainLayout },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: NotFoundView,
    meta: { layout: MainLayout },
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

router.afterEach((to, from) => {
  const store = useStore<RootState>();
  const lastPath = store.getters["navigation/getLastPath"];
  if (to.fullPath !== lastPath) {
    store.commit("navigation/push", from.fullPath);
  } else {
    store.commit("navigation/pop");
  }
});

export default router;
