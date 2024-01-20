import { useState } from "react";
import axios from 'axios';
import { host } from '../configs.json';
import { useStore } from '../stores/store';

type UseAxiosProps = {
  url: string
  method: "GET" | "POST" | "PUT" | "DELETE"
  disableErrorNotification: boolean
};

type CommonFetch = {
  requestBody?: { [index: string]: any };
}

type Status = 'SUCCESS' | 'FAILURE' | 'PENDING';

export function useAxios<T> ({ url, method, disableErrorNotification = false }: UseAxiosProps) {
  const addNotification = useStore((state) => state.addNotification);
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

    setStatus(status);
    setData(data);
    setError({
      code: error_code,
      description: error_description,
    })

    if (status === 'FAILURE' && !disableErrorNotification) {
      addNotification({
        id: _.uniqueId('notification'),
        message: error_description,
        type: 'ERROR',
      });
    }
  };

  return { status, error, commonFetch, data };
};