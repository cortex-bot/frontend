import { useState } from "react";
import axios from 'axios';
import { host } from '../configs.json';

type UseAxiosProps = {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE"
};

type CommonFetch = {
  requestBody?: { [index: string]: any };
}

type Status = 'SUCCESS' | 'FAILURE' | 'PENDING';

export function useAxios<T> ({ url, method }: UseAxiosProps) {
  const [status, setStatus] = useState<Status>('PENDING');
  const [error, setError] = useState({ code: null, description: null});
  const [data, setData] = useState<T | null>(null);

  const commonFetch = async ({
    requestBody
  }: CommonFetch = {}) => {
    setStatus('PENDING');

    const { data: { data, error_code, error_description, status } } = await axios({
        method,
        url: host + url,
        data: requestBody,
      });

    // TODO: Add error handling
    setStatus(status);
    setData(data);
    setError({
      code: error_code,
      description: error_description,
    })
  };

  return { status, error, commonFetch, data };
};