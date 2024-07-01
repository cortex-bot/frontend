import { omit } from "lodash";
import { useCallback, useMemo } from "react";
import { useExecuteStrategy } from "../../api/algotrading/requests";
import useLocalStorage, { BrokerDetails } from "../../hooks/useLocalStorage";
import { useAppStore } from "../../stores/store";

export const useAnalysis = () => {
  const strategyConfig = useAppStore((state) => state.strategyConfig);
  const setStrategyConfig = useAppStore((state) => state.setStrategyConfig);
  const { storedValue: userName } = useLocalStorage<string | undefined>(
    "username"
  );
  const { storedValue: brokerDetails } = useLocalStorage<
    BrokerDetails | undefined
  >("brokerDetails");
  const code = useAppStore((state) => state.code);

  const executeStrategyRequestData = useMemo(
    () => ({
      ...strategyConfig,
      username: userName,
      strategy_code: code,
      backtestEngine: "simple_engine",
      broker_name: brokerDetails?.name,
    }),
    [strategyConfig, userName, code, brokerDetails?.name]
  );

  const {
    data: analysisWithTrades,
    refetch,
    ...rest
  } = useExecuteStrategy(executeStrategyRequestData);

  const analysis = useMemo(
    () => omit(analysisWithTrades, "trades"),
    [analysisWithTrades]
  );

  const trades = useMemo(
    () => analysisWithTrades?.trades ?? [],
    [analysisWithTrades?.trades]
  );

  return {
    analysis,
    trades,
    strategyConfig,
    setStrategyConfig,
    executeActiveStrategy: refetch,
    ...rest,
  };
};
