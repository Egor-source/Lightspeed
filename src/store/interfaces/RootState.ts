import { CartState } from "@/store/interfaces/CartState";
import { NavigationState } from "@/store/interfaces/NavigationState";
import { NotificationState } from "@/store/interfaces/NotificationState";

export interface RootState {
  cart: CartState;
  navigation: NavigationState;
  notification: NotificationState;
}
