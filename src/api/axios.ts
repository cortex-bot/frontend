import { useMemo, useState } from "react";
import axios from "axios";
import { host, dataServiceHost, brokerServiceHost } from "../configs.json";
import { useStore } from "../stores/store";
import { forEach, get } from "lodash";
import { url } from "inspector";
import { GenericResponse, Status } from "./types";

type ServiceType = "MANAGER" | "DATA" | "BROKER";
type MethodType = "GET" | "POST" | "PUT" | "DELETE";

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

type RequestData = {
  endpoint: string;
  method?: MethodType;
  requestBody?: { [index: string]: any };
  queryParams?: { [index: string]: any };
  service?: ServiceType;
};

export function useAxios<T>({
  url,
  method,
  disableErrorNotification = false,
  service = "MANAGER",
}: UseAxiosProps) {
  const addNotification = useStore((state) => state.addNotification);
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

export const getRequestPromise = async <T>({
  endpoint,
  method = 'GET',
  requestBody,
  queryParams,
  service = 'MANAGER',
}: RequestData): Promise<GenericResponse<T>> => {
  const hostUrl = getHostUrlForService(service);
  const url = generateUrlString(hostUrl, endpoint, queryParams);
  const {
    data: { data, error_code, error_description, status },
  } = await axios({
    method,
    url,
    data: requestBody,
  });

  return {
    status,
    data,
    errorCode: error_code,
    errorDescription: error_description,
  };
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
