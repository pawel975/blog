import { useState, useEffect } from "react";

interface ApiReturnedElementsInterface {
  data: any;
  loading: boolean;
  error: Error | null;
}

const useApiData = (
  url: string,
  params?: RequestInit
): ApiReturnedElementsInterface => {
  const [data, setData] = useState<object | object[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, params);
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(
          error instanceof Error ? error : new Error("An error occured")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params, url]);

  return { data, loading, error };
};

export default useApiData;
