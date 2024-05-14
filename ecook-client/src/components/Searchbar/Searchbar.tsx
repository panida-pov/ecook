import "./Searchbar.css";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { RemoveButton } from "../RemoveButton/RemoveButton";
import React from "react";
import { useSearchParams } from "react-router-dom";

type SearchbarProps = {
  search: string;
  setSearch: (search: string) => void;
  placeHolder: string;
};

export const Searchbar = (props: SearchbarProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    props.search === ""
      ? searchParams.delete("search")
      : searchParams.set("search", props.search);
    setSearchParams(searchParams);
  };

  return (
    <form className="SearchBar" onSubmit={handleSubmit}>
      <button type="submit">
        <SearchRoundedIcon
          style={{
            fontSize: "1.5rem",
            color: "#7F7F7F",
          }}
        />
      </button>
      <input
        placeholder={props.placeHolder}
        value={props.search}
        onChange={({ target }) => {
          props.setSearch(target.value.toLowerCase());
        }}
      ></input>
      <RemoveButton type="submit" onClick={() => props.setSearch("")} />
    </form>
  );
};
