import { NotificationState } from "@/store/interfaces/NotificationState";
import { v4 } from "uuid";
import { Notification } from "@/interfaces/Notification";

export const addNotification = (
  state: NotificationState,
  notification: Omit<Notification, "id">
) => {
  const id = v4();
  state.notifications.unshift({ id, ...notification });
  const timeout = setTimeout(() => {
    removeNotification(state, id);
  }, 5000);
  state.timeouts[id] = timeout;
};
export const removeNotification = (
  state: NotificationState,
  notificationId: Notification["id"]
) => {
  state.notifications = state.notifications.filter(
    ({ id }) => id !== notificationId
  );
  const timeout = state.timeouts[notificationId];
  if (timeout) {
    clearTimeout(timeout);
    delete state.timeouts[notificationId];
  }
};
