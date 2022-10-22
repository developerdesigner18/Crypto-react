import React, { useEffect, useState } from "react";

export const useFetchApi = (url, value) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(url, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "ff7061690dmshfd3e9f86e03558ap172814jsne4ba9b39c8b0",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        console.log(error);
        setLoading(false);
      });
  }, [url, value]);

  return {
    data,
    loading,
    error,
  };
};
