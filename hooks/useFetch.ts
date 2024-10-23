// import axios, { AxiosRequestConfig } from "axios";
// import { useCallback, useEffect, useState } from "react";

// const useFetch = (
//   url: string,
//   method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
//   delay: number,
//   reqData?: {}
// ) => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchData = useCallback(async () => {
//     const controller = new AbortController();
//     const axiosConfig: AxiosRequestConfig = {
//       url,
//       method,
//       data: reqData,
//       signal: controller.signal,
//     };

//     try {
//       const { data } = await axios(axiosConfig);

//       setData(data.data);
//     } catch (error: any) {
//       if (axios.isCancel(error)) {
//         console.log("Request Canceled", error.message);
//       } else {
//         setError(error.message);
//       }
//     } finally {
//       setLoading(false);
//     }
//   }, [url, method, reqData]);

//   useEffect(() => {
//     const id = setTimeout(() => {
//       fetchData();
//     }, delay);
//     return () => {
//       clearTimeout(id);
//     };
//   }, [fetchData]);

//   return { data, loading, error };
// };

// export default useFetch;
