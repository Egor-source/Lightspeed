import { NotificationState } from "@/store/interfaces/NotificationState";

export const getNotifications = (state: NotificationState) =>
  state.notifications;
