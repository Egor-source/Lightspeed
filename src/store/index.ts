import { createStore } from "vuex";
import cart from "@/store/cart";
import { RootState } from "@/store/interfaces/RootState";
import navigation from "@/store/navigation";
import notification from "@/store/notification";

export default createStore<RootState>({
  modules: { cart, navigation, notification },
});
