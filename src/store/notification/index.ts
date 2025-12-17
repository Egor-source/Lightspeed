import { Module } from "vuex";
import { RootState } from "@/store/interfaces/RootState";
import state from "./state";
import * as getters from "./getters";
import * as mutations from "./mutations";
import { NotificationState } from "@/store/interfaces/NotificationState";

const notification: Module<NotificationState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
};

export default notification;
