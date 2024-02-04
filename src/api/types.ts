

export type Status = "SUCCESS" | "FAILURE" | "PENDING";

export type ServiceType = "MANAGER" | "DATA" | "BROKER";
export type MethodType = "GET" | "POST" | "PUT" | "DELETE";

export type RequestData = {
  endpoint: string;
  method?: MethodType;
  requestBody?: { [index: string]: any };
  queryParams?: { [index: string]: any };
  service?: ServiceType;
  invalidateEndpoint?: string;
};

export type GenericResponse<T> = {
  status: Status;
  data?: T;
  errorCode?: string;
  errorDescription?: string;
}