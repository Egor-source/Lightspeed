import state from "./state";
import * as getters from "./getters";
import * as mutations from "./mutations";
import { Module } from "vuex";
import { CartState } from "@/store/interfaces/CartState";
import { RootState } from "@/store/interfaces/RootState";

const card: Module<CartState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
};

export default card;
