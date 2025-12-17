import { NavigationState } from "@/store/interfaces/NavigationState";
import { NAVIGATION_HISTORY } from "@/store/navigation/constants";

const state = (): NavigationState => {
  const itemsString = sessionStorage.getItem(NAVIGATION_HISTORY);
  const history: string[] = itemsString ? JSON.parse(itemsString) : [];

  return { history };
};

export default state;
