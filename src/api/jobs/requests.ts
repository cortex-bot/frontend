import { getRequestPromise, useAxios } from "../axios";
import { AllJobsResponse, JobData } from "./types";
import {
  getAllJobs as getAllJobsEndpoint,
  getJob as getJobEndpoint,
  pauseJob as pauseJobEndpoint,
  resumeJob as resumeJobEndpoint,
  deleteJob as deleteJobEndpoint,
} from "../../configs.json";

export const useGetAllJobs = () => {
  const { commonFetch, status, error, data } = useAxios<JobData[]>({
    url: getAllJobsEndpoint,
    method: "GET",
  });

  return { getAllJobs: commonFetch, status, error, data };
};

export const getJob = ({ jobId }: { jobId: string }) => {
  return getRequestPromise<JobData>({
    endpoint: getJobEndpoint,
    queryParams: {
      ref_id: jobId,
    },
  });
};

export const pauseJob = ({ jobId }: { jobId: string }) => {
  return getRequestPromise<string>({
    endpoint: pauseJobEndpoint,
    method: "PUT",
    queryParams: {
      ref_id: jobId,
    },
  });
};

export const resumeJob = ({ jobId }: { jobId: string }) => {
  return getRequestPromise<string>({
    endpoint: resumeJobEndpoint,
    method: "PUT",
    queryParams: {
      ref_id: jobId,
    },
  });
};

export const deleteJob = ({ jobId }: { jobId: string }) => {
  return getRequestPromise<string>({
    endpoint: deleteJobEndpoint,
    method: "PUT",
    queryParams: {
      ref_id: jobId,
    },
  });
};
