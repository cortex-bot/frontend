import { create } from 'zustand';

interface Notification {
  id: string
  message: string
  type?: 'SUCCESS' | 'ERROR' | 'INFO'
}

export interface State {
  notifications: Notification[]
  addNotification: (notification: Notification) => void
  closeNotification: (id: string) => void
}

export const useStore = create<State>()((set) => ({
  notifications: [] as Notification[],
  addNotification: (notification) => set((state) => ({ notifications: [...state.notifications, notification] })),
  closeNotification: (id) => set((state) => ({ notifications: state.notifications.filter((notification) => notification.id !== id) }))
}))