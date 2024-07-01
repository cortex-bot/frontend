import { create, useStore } from "zustand";
import createAlgoTradingSlice, { AlgoTradingSlice } from "./algoTradingSlice";
import createNotificationSlice, {
  NotificationSlice,
} from "./notificationSlice";

type AppState = NotificationSlice & AlgoTradingSlice;

export const useRootStore = create<AppState>()((...args) => ({
  ...createNotificationSlice(...args),
  ...createAlgoTradingSlice(...args),
}));

export const useAppStore = <T>(selector?: (state: AppState) => T) => {
  return useStore(useRootStore, selector!);
};
