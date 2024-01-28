

export type Status = "SUCCESS" | "FAILURE" | "PENDING";

export type GenericResponse<T> = {
  status: Status;
  data?: T;
  errorCode?: string;
  errorDescription?: string;
}