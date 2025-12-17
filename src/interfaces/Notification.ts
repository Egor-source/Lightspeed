export interface Notification {
  id: number | string;
  text: string;
  type: "success" | "warning" | "error";
}
