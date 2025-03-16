
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../config/axiosInstance";

export const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(url);
      console.log("API Response:", response.data); // ✅ Debugging: Ensure correct response
      setData(response.data?.courses || []);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, isLoading, error };
};
