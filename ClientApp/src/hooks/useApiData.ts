import { useState, useEffect } from "react";

interface ApiReturnedElementsInterface<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

const useApiData = <T>(fetchDataFn: () => Promise<T>): ApiReturnedElementsInterface<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchDataFn();
        setData(result);
      } catch (error) {
        setError(error instanceof Error ? error : new Error("An error occured"));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useApiData;
