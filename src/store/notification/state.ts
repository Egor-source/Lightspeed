import { NotificationState } from "@/store/interfaces/NotificationState";

const state = (): NotificationState => ({
  notifications: [],
  timeouts: {},
});

export default state;
