export type ExecutorRequest = {
    broker_name: string;
    executor_type: string;
    trade_type: string;
    username: string;
    remarks: string;
    strategy_params: {
      stock_list: string;
      strategy_name: string;
      start_date:string;
      end_date: string;
    }
}

export type ExecutorResponse = {
  executor_id: string
}