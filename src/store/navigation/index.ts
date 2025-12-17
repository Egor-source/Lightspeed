import { Module } from "vuex";
import { NavigationState } from "@/store/interfaces/NavigationState";
import { RootState } from "@/store/interfaces/RootState";
import state from "./state";
import * as getters from "./getters";
import * as mutations from "./mutations";

const navigation: Module<NavigationState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
};

export default navigation;
