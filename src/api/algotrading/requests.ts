import { getQueryKeyForEndpoint, useFetch, usePost } from "../queryClient";
import {
  executeStrategy as executeStrategyEndpoint,
  getStockData as getStockDataEndpoint,
} from "../../configs.json";
import {
  ExecuteStrategyRequest,
  ExecuteStrategyResponse,
  ExecuteStrategyResult,
  GetStockDataRequest,
  StockData,
} from "./types";

export const useExecuteStrategy = (
  executeStrategyRequest: ExecuteStrategyRequest
) => {
  return useFetch<ExecuteStrategyResult, ExecuteStrategyRequest>({
    endpoint: executeStrategyEndpoint,
    requestBody: executeStrategyRequest,
    method: "POST",
    options: {
      enabled: false,
    },
  });
};

export const useGetStocksData = (getStocksDataRequest: GetStockDataRequest) => {
  return useFetch<StockData[], GetStockDataRequest>({
    endpoint: getStockDataEndpoint,
    requestBody: getStocksDataRequest,
    method: "POST",
    service: "DATA",
  });
};
