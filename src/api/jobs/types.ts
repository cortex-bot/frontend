export type Status = "ACTIVE" | "PAUSED";

export type JobData = {
  id: string;
  name: string;
  func: string;
  next_run_time: string;
  status: Status;
};
