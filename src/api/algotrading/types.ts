export type StockData = {
  Close: number;
  Date: string;
  High: number;
  Low: number;
  Open: number;
  Volume: number;
};

type StockDataConfig = {
  ticker: string;
  startDate: string;
  endDate: string;
  interval: string;
};

export type StrategyConfig = StockDataConfig & {
  strategyName: string;
  enableRanking: boolean;
  stockBasket: string | null;
  description: string;
};

export type GetStockDataRequest = StockDataConfig & {
  username?: string;
  broker_name?: string;
};

export type ExecuteStrategyRequest = StrategyConfig & {
  username?: string;
  strategy_code: string;
  backtestEngine: string;
  broker_name?: string;
};

export type Trade = {
  stock_name: string | null;
  quantity: number;
  action: "BUY" | "SELL";
  timestamp: string;
  amount: number;
  order_type: "MARKET";
  stop_loss: null;
  take_profit: null;
};

export type ExecuteStrategyResult = {
  status: string;
  message: string;
  strategy_name: string;
  total_investment: number;
  total_sell_amount: number;
  number_of_trades: number;
  stock_growth: number;
  profit_percentage: number;
  trades: Trade[];
  strategy_config: Record<string, unknown>;
  stock_name: string;
  stock_basket_name: string | null;
  last_traded_price: number;
  avg_profit_per_day: number;
  max_profit_percentage: number;
  min_profit_percentage: number;
  max_duration_of_trade: number;
};

export type ExecuteStrategyResponse = {
  status: "SUCCESS";
  data: ExecuteStrategyResult;
  error_code: null;
  error_description: null;
};
