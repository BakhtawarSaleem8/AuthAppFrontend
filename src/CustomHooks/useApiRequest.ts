import { useState, useEffect, useCallback } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface UseApiRequestOptions {
  url: string | null; // API endpoint, null disables the request
  config?: AxiosRequestConfig; // Axios configuration object
  dependencies?: any[]; // Dependencies to trigger useEffect
  manual?: boolean; // If true, prevents auto-fetch on mount/dependency change
}
type APIResponse<T> = { data?: T; error?: string | null };

function useApiRequest<T extends unknown>({
  url,
  config = {},
  dependencies = [],
  manual = false,
}: UseApiRequestOptions) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const authUser: undefined | Record<string, string> = (() => {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : undefined;
  })();
  console.log(config?.data , "payyylooad.. api hook")

  const fetchData: <T>() => Promise<APIResponse<T>> = useCallback(async <T>() => {
    if (!url) return { data: null, error: "URL is missing" } as APIResponse<T>;
  
    try {
      setIsLoading(true);
      console.log(config?.data , "delete payload final")
      const response: AxiosResponse<T> = await axios({
        url,
        method: config?.method || "GET",
        headers: {
          "Content-Type": config.headers?.["Content-Type"] ? config.headers?.["Content-Type"] : "application/json",
          // ...config.headers,
          "Authorization": authUser?.token ? `Bearer ${authUser?.token}` : undefined,
        
        },
        data: config?.data,
        params: config?.params,
        // ...config,
      });
  console.log(response.data , "response data")
      setData(response.data as T | any);
      return { data: response.data, error: null } as APIResponse<T>;
    } catch (err: any) {
      const errorResponse = err.response?.data?.message || err.message || "Something went wrong!";
      setError(errorResponse);
      return { data: null, error: errorResponse } as APIResponse<T>;
    } finally {
      setIsLoading(false);
    }
  }, [url, config]);
  
  useEffect(() => {
    if (!manual) {
      fetchData();
    }
  }, [...dependencies]);

  return { data, error, isLoading, refetch: fetchData };
}

export default useApiRequest;


//   if (!url) return;
  // const fetchData = useCallback(async () => {


  //   try {
  //     setIsLoading(true)
  //     const response: AxiosResponse<T> = await axios({
  //       url,
  //       method: config.method || "GET", // Default to GET
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: authUser?.token ? `Bearer ${authUser?.token}` : undefined, // Include token in headers
  //         ...config.headers,
  //       },
  //       data: config.data, // Axios automatically stringifies JSON
  //       params: config.params, // Query parameters
  //       ...config, // Spread other Axios config options
  //     });
  //     console.log(response)
  //     setData(response.data);
  //     console.log(response.data)
  //     return { data: response.data, error: null }; // Return data

  //   } catch (err: any) {
  //     setError(err.response?.data?.message || err.message || "Something went wrong!");
  //     console.error(err);
  //     return { data: null, error: err }; // Return error
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, [url, config]);

  // Automatically fetch data unless manual mode is enabled