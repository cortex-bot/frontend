import { getRequestPromise, useAxios } from "../axios";
import { AllJobsResponse, JobData } from "./types";
import {
  getAllJobs as getAllJobsEndpoint,
  getJob as getJobEndpoint,
  pauseJob as pauseJobEndpoint,
  resumeJob as resumeJobEndpoint,
  deleteJob as deleteJobEndpoint,
} from "../../configs.json";
import { useGet, usePut } from "../queryClient";

export const useGetAllJobs = () => {
  return useGet({
    endpoint: getAllJobsEndpoint,
  });
  // const { commonFetch, status, error, data } = useAxios<JobData[]>({
  //   url: getAllJobsEndpoint,
  //   method: "GET",
  // });

  // return { getAllJobs: commonFetch, status, error, data };
};

export const getJob = ({ jobId }: { jobId: string }) => {
  return getRequestPromise<JobData>({
    endpoint: getJobEndpoint,
    queryParams: {
      ref_id: jobId,
    },
  });
};

export const usePauseJob = () => {
  const { mutate, isSuccess } = usePut({
    endpoint: pauseJobEndpoint,
    invalidateEndpoint: getAllJobsEndpoint,
  });

  const pauseJob = ({ jobId }: { jobId: string }) => {
    mutate({
      queryParams: {
        ref_id: jobId,
      },
    });
  };

  return { pauseJob, isSuccess };
};

export const useResumeJob = () => {
  const { mutate } = usePut({
    endpoint: resumeJobEndpoint,
    invalidateEndpoint: getAllJobsEndpoint,
  });

  const resumeJob = ({ jobId }: { jobId: string }) => {
    mutate({
      queryParams: {
        ref_id: jobId,
      },
    });
  };

  return { resumeJob };
};

export const deleteJob = ({ jobId }: { jobId: string }) => {
  const { mutate } = usePut({
    endpoint: deleteJobEndpoint,
    invalidateEndpoint: getAllJobsEndpoint,
  });

  const deleteJob = ({ jobId }: { jobId: string }) => {
    mutate({
      queryParams: {
        ref_id: jobId,
      },
    });
  };

  return { deleteJob };
};
