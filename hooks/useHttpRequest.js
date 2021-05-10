import { useState, useCallback } from "react";

export const useHttpRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setLoading(true);

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
        });

        const responseData = await response.json();

        if (!response.ok) {
          setError(responseData.message);
          throw new Error(responseData.message);
        }

        setLoading(false);
        return { ...responseData };
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    },
    []
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { loading, error, sendRequest, clearError };
};
