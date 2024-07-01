import { StateCreator } from "zustand";

interface Notification {
  id: string;
  message: string;
  type?: "success" | "info" | "warning" | "error";
}

export interface NotificationSlice {
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  closeNotification: (id: string) => void;
}

const createNotificationSlice: StateCreator<
  NotificationSlice,
  [],
  [],
  NotificationSlice
> = (set) => ({
  notifications: [] as Notification[],
  addNotification: (notification) =>
    set((state) => ({ notifications: [...state.notifications, notification] })),
  closeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter(
        (notification) => notification.id !== id
      ),
    })),
});

export default createNotificationSlice;
