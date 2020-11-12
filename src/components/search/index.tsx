import React, { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import Form from "./Form";
import AutocompleteList from "./AutocompleteList";
import useAsync from "../../useAsync";
import { Autocomplete, PlaceDetail } from "../../type";
import {
  fetchData,
  getGoogleFetchingUrl,
  processState,
  getWeatherLocationQuery,
  getAddressByDet,
} from "../../util";
import { GOOGLE_AUTOCOMPLETE_BASE } from "../../constant";

interface IProps {
  onWeatherQuery(query: string, address: string): void;
}

const Search: React.FC<IProps> = ({ onWeatherQuery }) => {
  const sessionIdRef = useRef(uuidv4());
  const [input, setInput] = useState("");
  const [detailErr, setDetailErr] = useState("");
  const {
    run: autocompleteRun,
    state: autocompleteState,
    clearData,
  } = useAsync<Autocomplete>();
  const { run: detailRun, state: detailState } = useAsync<PlaceDetail>();
  const { rejected, resolved, asyncData: detailData, error } = processState<
    PlaceDetail
  >(detailState);

  const handleChange = (searchTerm: string) => {
    setInput(searchTerm);
    if (!searchTerm.trim()) return;
    const fetchUrl = getGoogleFetchingUrl(
      GOOGLE_AUTOCOMPLETE_BASE,
      sessionIdRef.current,
      searchTerm,
      false
    );
    autocompleteRun(fetchData(fetchUrl));
  };
  const handleSelect = (listItem: string) => {
    setInput(listItem);
  };
  const handleSubmit = () => {
    setInput("");
    if (resolved) {
      const query = getWeatherLocationQuery(detailData.result);
      const address = getAddressByDet(detailData.result);
      onWeatherQuery(query, address);
    }
    if (rejected) {
      setDetailErr(error.message);
    }
  };
  return (
    <div>
      <Form onChange={handleChange} input={input} onSubmit={handleSubmit} />
      <AutocompleteList
        state={autocompleteState}
        sessionToken={sessionIdRef.current}
        onSelect={handleSelect}
        input={input}
        detailRun={detailRun}
        clearData={clearData}
      />
      {rejected && <p>{detailErr}</p>}
    </div>
  );
};

export default Search;
