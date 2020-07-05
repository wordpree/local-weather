import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import { getGoogleAutoCompleteUrl as getUrl } from "../../fetchUrl";
import { FaSearchLocation } from "react-icons/fa";
import useAutoComplete from "./useAutoComplete";

const SearchForm = () => {
  const [autocomplete, setAutocomplete] = useState("");
  const { input, setInput, data } = useAutoComplete(getUrl);
  console.log(data);

  const handleSubmit = (input: string) => (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => setInput(e.target.value);

  return (
    <form onSubmit={() => handleSubmit(input)}>
      <TextField
        placeholder="location..."
        onChange={handleChange}
        value={input}
      />
      <FaSearchLocation />
    </form>
  );
};

export default SearchForm;
