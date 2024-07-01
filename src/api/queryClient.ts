import {
  QueryClient,
  QueryFunction,
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import _, { capitalize, chain, noop } from "lodash";
import { useAppStore } from "../stores/store";
import { getRequestPromise, useAxios } from "./axios";
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

export const useFetch = <T, R = never, Q = never>({
  endpoint,
  service,
  requestBody,
  queryParams,
  method = "GET",
  options,
  showErrorNotification = true,
  customErrorMessage,
}: RequestData<R, Q> & {
  options?: Partial<UseQueryOptions<T | null, Error, T | null, QueryKey>>;
}) => {
  const addNotification = useAppStore((state) => state.addNotification);
  const queryKey = [getQueryKeyForEndpoint(endpoint), requestBody, queryParams];
  try {
    const getData = async () => {
      const { data, errorCode, errorDescription, status } =
        await getRequestPromise<T, R, Q>({
          endpoint,
          method,
          requestBody,
          queryParams,
          service,
        });

      if (status === "FAILURE" && showErrorNotification) {
        addNotification({
          id: _.uniqueId("notification"),
          message: customErrorMessage ?? `${errorCode}: ${errorDescription}`,
          type: "error",
        });
      }

      return data;
    };
    return useQuery({
      ...options,
      queryKey,
      queryFn: getData,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occured";

    console.log(errorMessage);
    if (showErrorNotification) {
      addNotification({
        id: _.uniqueId("notification"),
        message: customErrorMessage ?? errorMessage,
        type: "error",
      });
    }
    throw new Error(errorMessage);
  }
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

// TODO: Add success/failure notifications. Think about whether to put it in getRequestPromise or let react query handlers do the job
export const usePost = <T, R, Q>({
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

  const postData = async ({
    requestBody,
    queryParams,
  }: {
    requestBody?: R;
    queryParams?: Q;
  }) => {
    try {
      const response = await getRequestPromise<T, R, Q>({
        endpoint,
        service,
        method: "POST",
        requestBody,
        queryParams,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data.error_description || "An unknown error occurred"
        );
      }
      throw new Error("An unknown error occurred");
    }
  };

  return useMutation<T | undefined, any, any>({
    mutationFn: postData,
    onSuccess: successHandler,
  });
};
