import { useState, useEffect } from "react";
import { fetchData } from "../../api";
import { Autocomplete, GetUrl } from "../../type";

const useAutocomplete = (getUrl: GetUrl) => {
  const [input, setInput] = useState("");
  const [data, setData] = useState<Autocomplete>();
  useEffect(() => {
    async function getAutocomplete(location: string) {
      if (location.trim().length === 0) {
        return;
      }
      const url = getUrl(location);
      const ret = await fetchData<Autocomplete>(url);
      setData(ret);
    }
    getAutocomplete(input);
  }, [input]);
  return { input, setInput, data };
};

export default useAutocomplete;
