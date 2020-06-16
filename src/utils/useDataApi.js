import { useState, useEffect, useReducer } from "react";
import axios from "axios";
import dataFetchReducer from "./dataFetchReducer";

const useDataApi = (initialUrl, initialData) => {
  const [url, setUrl] = useState(initialUrl);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });

  const clientId = "3687b2a161afdd88a4a6";
  const clientSecret = "d9ec48b38416c5789608313144ea319e6c6ad1fc";
  const auth = "&client_id=" + clientId + "&client_secret=" + clientSecret;

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });

      try {
        const result = await axios(url);
        console.log(url + auth);

        if (!didCancel) {
          dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: "FETCH_FAILURE" });
        }
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [url]);

  return [state, setUrl];
};

export default useDataApi;
