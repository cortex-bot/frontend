import { QueryKey, useQuery } from "@tanstack/react-query";
import _, { capitalize, chain } from "lodash";
import { getRequestPromise } from "./axios";
import { RequestData, ServiceType } from "./types";

const getQueryKeyForEndpoint = (endpoint: string): QueryKey => {
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
