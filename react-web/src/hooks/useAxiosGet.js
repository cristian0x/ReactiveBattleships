import axios from "axios";
import React, { useState, useEffect } from "react";

export default function useAxiosGet(url) {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  async function getData() {
    setIsPending(true);
    try {
      const { data } = await axios.get(url, {
        cancelToken: source.token,
      });
      setData(data);
      setIsPending(false);
    } catch (e) {
      setError(e);
    }
  }

  useEffect(() => {
    getData();
    return () => {
      source.cancel("User canceled operation!");
      console.log("canceled axios");
      console.log(source.token);
    };
  }, [url]);

  return { data, isPending, error };
}