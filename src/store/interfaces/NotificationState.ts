import { Notification } from "@/interfaces/Notification";
export interface NotificationState {
  notifications: Notification[];
  timeouts: { [key: Notification["id"]]: number };
}
