import { NavigationState } from "@/store/interfaces/NavigationState";
import { NAVIGATION_HISTORY } from "@/store/navigation/constants";

export const push = (state: NavigationState, path: string) => {
  if (state.history.length >= 20) {
    state.history.shift();
  }
  state.history.push(path);
  sessionStorage.setItem(NAVIGATION_HISTORY, JSON.stringify(state.history));
};

export const pop = (state: NavigationState) => {
  state.history.pop();
  sessionStorage.setItem(NAVIGATION_HISTORY, JSON.stringify(state.history));
};
