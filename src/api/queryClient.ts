import {
  QueryClient,
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import _, { capitalize, chain, noop } from "lodash";
import { getRequestPromise } from "./axios";
import { RequestData, ServiceType } from "./types";

type UsePutData = {
  endpoint: string;
  service?: ServiceType;
  invalidateEndpoint?: string;
  successNotificationMessage?: string;
  failureNotificationMessage?: string;
};

export const getQueryKeyForEndpoint = (endpoint: string): QueryKey => {
  return [chain(endpoint).split(/[-/]/).map(capitalize).join("").value()];
};

export const useGet = <T>({
  endpoint,
  service,
  requestBody,
  queryParams,
}: RequestData) => {
  const queryKey = getQueryKeyForEndpoint(endpoint);
  const getData = async () => {
    const response = await getRequestPromise<T>({
      endpoint,
      method: "GET",
      requestBody,
      queryParams,
      service,
    });
    return response.data;
  };
  return useQuery({
    queryKey,
    queryFn: getData,
  });
};

// TODO: Add success/failure notifications. Think about whether to put it in getRequestPromise or let react query handlers do the job
export const usePut = <T>({
  endpoint,
  service,
  invalidateEndpoint,
  successNotificationMessage,
  failureNotificationMessage,
}: UsePutData) => {
  const queryClient = useQueryClient();
  const successHandler = () => {
    if (invalidateEndpoint) {
      queryClient.invalidateQueries({
        queryKey: getQueryKeyForEndpoint(invalidateEndpoint),
      });
    }
  };

  const putData = async ({
    requestBody,
    queryParams,
  }: {
    requestBody?: { [index: string]: any };
    queryParams?: { [index: string]: any };
  }) => {
    const response = await getRequestPromise<T>({
      endpoint,
      service,
      method: "PUT",
      requestBody,
      queryParams,
    });
    return response.data;
  };

  return useMutation({
    mutationFn: putData,
    onSuccess: successHandler,
  });
};
