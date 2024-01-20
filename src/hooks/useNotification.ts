import { useEffect } from 'react';
import { useStore } from '../stores/store';

export const useApiErrorNotification = function(status, error) {
  const addNotification = useStore((state) => state.addNotification);
  useEffect(() => {
    if (status === 'FAILURE' && error.description) {
      addNotification({
        id: _.uniqueId('notification'),
        message: error.description,
      });
    }
  }, [status, error])
}