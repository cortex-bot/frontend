import { useMemo, useState } from "react";
import axios, { AxiosRequestConfig, isAxiosError } from "axios";
import { host, dataServiceHost, brokerServiceHost } from "../configs.json";
import { useAppStore } from "../stores/store";
import { forEach, get } from "lodash";
import { url } from "inspector";
import {
  GenericResponse,
  MethodType,
  RequestData,
  ServiceType,
  Status,
} from "./types";

type UseAxiosProps = {
  url: string;
  method: MethodType;
  disableErrorNotification?: boolean;
  service?: ServiceType;
};

type CommonFetch = {
  requestBody?: { [index: string]: any };
  queryParams?: { [index: string]: any };
};

export function useAxios<T>({
  url,
  method,
  disableErrorNotification = false,
  service = "MANAGER",
}: UseAxiosProps) {
  const addNotification = useAppStore((state) => state.addNotification);
  const [status, setStatus] = useState<Status>("PENDING");
  const [error, setError] = useState({ code: null, description: null });
  const [data, setData] = useState<T | null>(null);
  const hostUrl = useMemo(() => getHostUrlForService(service), [service]);

  const commonFetch = async ({
    requestBody,
    queryParams,
  }: CommonFetch = {}) => {
    const queryAppendedUrl = generateUrlString(hostUrl, url, queryParams);
    setStatus("PENDING");

    const {
      data: { data, error_code, error_description, status },
    } = await axios({
      method,
      url: queryAppendedUrl,
      data: requestBody,
    });

    setStatus(status);
    setData(data);
    setError({
      code: error_code,
      description: error_description,
    });

    if (status === "FAILURE" && !disableErrorNotification) {
      addNotification({
        id: _.uniqueId("notification"),
        message: error_description,
        type: "ERROR",
      });
    }
  };

  return { status, error, commonFetch, data };
}

export const getRequestPromise = async <T, R, Q>({
  endpoint,
  method = "GET",
  requestBody,
  queryParams,
  service = "MANAGER",
}: RequestData<R, Q>): Promise<GenericResponse<T>> => {
  const hostUrl = getHostUrlForService(service);
  const url = generateUrlString(hostUrl, endpoint, queryParams);
  const {
    data: { data, error_code, error_description, status },
  } = await axiosFetch({ method, url, data: requestBody });

  return {
    status,
    data,
    errorCode: error_code,
    errorDescription: error_description,
  };
};

const axiosFetch = ({ method, url, data }: AxiosRequestConfig) => {
  const username = localStorage.getItem("username");
  return axios({
    method,
    url,
    data,
    headers: { "user-account-id": username },
  });
};

const getHostUrlForService = (service: ServiceType) => {
  return get(
    {
      MANAGER: host,
      DATA: dataServiceHost,
      BROKER: brokerServiceHost,
    },
    service
  );
};

const generateUrlString = (
  hostUrl: string,
  endpoint: string,
  queryParams?: { [index: string]: any }
): string => {
  const url = new URL(hostUrl + endpoint);
  forEach(queryParams, (value, key) => url.searchParams.set(key, value));
  return url.toString();
};
