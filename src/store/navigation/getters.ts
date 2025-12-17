import { NavigationState } from "@/store/interfaces/NavigationState";

export const getLastPath = (state: NavigationState) =>
  state.history[state.history.length - 1];
