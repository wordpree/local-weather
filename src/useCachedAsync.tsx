import { useEffect, useState } from "react";
import useAsync from "./useAsync";
import { fetchData } from "./util";

function useCachedAsync<T>(key: string = "", fetchUrl: string = "") {
  const { state, run, selectData } = useAsync<T>();
  const [cacheData, setcacheData] = useState<{ [key: string]: T }>({});
  useEffect(() => {
    if (!key || !fetchUrl) return;
    if (cacheData[key]) {
      selectData(cacheData[key]);
    } else {
      run(
        fetchData<T>(fetchUrl).then((data) => {
          setcacheData((cacheData) => ({
            ...cacheData,
            [key]: data,
          }));
          return data;
        })
      );
    }
  }, [key, fetchUrl, selectData, run, setcacheData, cacheData]);
  return { state, cacheData };
}

export default useCachedAsync;
