

export type Status = "SUCCESS" | "FAILURE" | "PENDING";

export type ServiceType = "MANAGER" | "DATA" | "BROKER";
export type MethodType = "GET" | "POST" | "PUT" | "DELETE";

export type RequestData<R, Q> = {
  endpoint: string;
  method?: MethodType;
  requestBody?: R;
  queryParams?: Q;
  service?: ServiceType;
  invalidateEndpoint?: string;
};

export type GenericResponse<T> = {
  status: Status;
  data: T | null;
  errorCode?: string;
  errorDescription?: string;
}