import { StateCreator } from "zustand";
import { StrategyConfig } from "../api/algotrading/types";
import { getStockMarketEndTime, getStockMarketOpenTime } from "./utils";

const DEFAULT_CODE_TEMPLATE =
  "#------------ Select Some pre-defined strategy, to get some idea --------------------";

export const DEFAULT_STRATEGY_CONFIG = {
  ticker: "ONGC",
  startDate: getStockMarketOpenTime(),
  endDate: getStockMarketEndTime(),
  enableRanking: false,
  description: "",
  stockBasket: null,
  interval: "5m",
  strategyName: "Random",
};

export interface AlgoTradingSlice {
  code: string;
  strategyConfig: StrategyConfig;
  setCode: (code: string) => void;
  setStrategyConfig: (strategyConfig: StrategyConfig) => void;
}

const createAlgoTradingSlice: StateCreator<
  AlgoTradingSlice,
  [],
  [],
  AlgoTradingSlice
> = (set) => ({
  code: DEFAULT_CODE_TEMPLATE,
  strategyConfig: DEFAULT_STRATEGY_CONFIG,
  setCode: (code) => set((state) => ({ code })),
  setStrategyConfig: (strategyConfig) => set((state) => ({ strategyConfig })),
});

export default createAlgoTradingSlice;
