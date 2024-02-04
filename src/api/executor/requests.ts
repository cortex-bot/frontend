import { useMemo } from "react";
import { ExecutorRequest, ExecutorResponse } from "./types";
import { useAxios } from "../axios";
import {
  host,
  spawnNewExecutor,
  getStrategyList as getStrategyListEndpoint,
  getBrokersList as getBrokersListEndpoint,
  getTradeTypeList as getTradeTypeListEndpoint,
} from "../../configs.json";
import { ManagerEndpoints } from "../endpoints";
import { useGet } from "../queryClient";

export const useGetActiveExecutors = () => {
  return useGet<any[]>({
    endpoint: ManagerEndpoints.activeExecutorsList,
  });
};

export const useInitiateExecutorApi = () => {
  const { commonFetch, status, error, data } = useAxios<ExecutorResponse>({
    url: spawnNewExecutor,
    method: "POST",
  });

  const inititateExecutor = (requestBody: ExecutorRequest) =>
    commonFetch({ requestBody });

  return { inititateExecutor, status, error, data };
};

export const useGetStrategyList = () => {
  const { commonFetch, status, error, data } = useAxios<string[]>({
    url: getStrategyListEndpoint,
    method: "GET",
  });

  return { getStrategyList: commonFetch, status, error, data };
};

export const useGetBrokerList = () => {
  const { commonFetch, status, error, data } = useAxios<string[]>({
    url: getBrokersListEndpoint,
    method: "GET",
  });

  return { getBrokersList: commonFetch, status, error, data };
};

export const useGetTradeTypeList = () => {
  const { commonFetch, status, error, data } = useAxios<string[]>({
    url: getTradeTypeListEndpoint,
    method: "GET",
  });

  return { getTradeTypeList: commonFetch, status, error, data };
};
