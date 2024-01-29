import { Status as JobStatus } from "../../api/jobs/types";

export type Job = {
  id: string;
  name: string;
  nextRunTime: string;
  status: JobStatus;
};
