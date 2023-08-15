import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetch_search_chats } from "../../redux/actions/action";
import "./search.css"

function Search() {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("");

  const onChangeHandler = (e) => {
    setFilter(e.target.value);
    dispatch(fetch_search_chats(e.target.value));
  };

  return (
    <div className="search-input-div">
     <div className="label-div"> <p>Filter by title</p></div>
      <input
        type="text"
        value={filter}
        onChange={onChangeHandler}
        placeholder="Type your text"
      />
    </div>
  );
}

export default Search;
