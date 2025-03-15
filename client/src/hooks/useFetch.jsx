// import React, { useEffect, useState } from "react";
// import { axiosInstance } from "../config/axiosInstance";

// export const useFetch = (url) => {
//   const [data, setData] = useState([]); // ✅ Initial state as empty array
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // ✅ Fetch Data Function
//   const fetchData = async () => {
//     setIsLoading(true); // ✅ Set loading state before fetching
//     try {
//       const response = await axiosInstance.get(url); // ✅ Corrected Axios call
//       setData(response.data?.courses || []); // ✅ Ensure data is correctly set
//     } catch (error) {
//       setError(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // ✅ Fetch data when component mounts or URL changes
//   useEffect(() => {
//     fetchData();
//   }, [url]);

//   return { data, isLoading, error };
// };
import { useState, useEffect } from "react";
import { axiosInstance } from "../config/axiosInstance";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(url);
        setData(response.data?.data || null); // ✅ Ensures correct data format
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, isLoading, error };
};
