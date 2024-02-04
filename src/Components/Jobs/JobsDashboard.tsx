import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import { map } from "lodash";
import { useMemo } from "react";
import {
  deleteJob,
  useGetAllJobs,
  usePauseJob,
  useResumeJob,
} from "../../api/jobs/requests";
import { JobData } from "../../api/jobs/types";
import MuiTable from "../common/Table/MuiTable";
import { JOB_COLUMNS } from "./consts";
import { Job } from "./types";

type PropTypes = {};

const JobsDashboard = (props: PropTypes) => {
  const { data: jobs } = useGetAllJobs();
  const { pauseJob } = usePauseJob();
  const { resumeJob } = useResumeJob();

  const parseJobData = (data: JobData): Job => {
    return {
      id: data.id,
      name: data.name,
      nextRunTime: data.next_run_time,
      status: data.status,
    };
  };

  const parsedJobs = useMemo(() => map(jobs, parseJobData), [jobs]);

  const handlePauseJob = async (jobId: string) => {
    pauseJob({ jobId });
  };

  const handleResumeJob = (jobId: string) => {
    resumeJob({ jobId });
  };

  const handleDeleteJob = (jobId: string) => {
    deleteJob({ jobId });
  };

  const getActionButton = (
    title: string,
    color: string,
    disabled: boolean,
    onClick: (jobId: string) => void,
    rowData: JobData
  ) => {
    return (
      <Button
        color={color}
        disabled={disabled}
        onClick={() => onClick(rowData.id)}
      >
        {title}
      </Button>
    );
  };

  const getPauseButton = (job: JobData) => {
    return getActionButton(
      "Pause",
      "warning",
      job.status === "PAUSED",
      handlePauseJob,
      job
    );
  };

  const getResumeButton = (job: JobData) => {
    return getActionButton(
      "Resume",
      "info",
      job.status === "ACTIVE",
      handleResumeJob,
      job
    );
  };

  const getDeleteButton = (job: JobData) => {
    return getActionButton("Delete", "error", false, handleDeleteJob, job);
  };

  const getActionColumns = () => {
    return [
      { title: "Pause Job", render: getPauseButton },
      { title: "Resume Job", render: getResumeButton },
      { title: "Delete Job", render: getDeleteButton },
    ];
  };

  const getColumns = () => {
    return [...JOB_COLUMNS, ...getActionColumns()];
  };

  return (
    <Box sx={{ p: "20px" }}>
      <MuiTable
        title="Jobs Dashboard"
        data={parsedJobs}
        columns={getColumns()}
      />
    </Box>
  );
};

export default JobsDashboard;
