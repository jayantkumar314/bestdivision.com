import React from "react"
import Svg from 'components/Svg'


function InnerSearch(props) {
  return (
    <form className="job-search p-3" autoComplete="off">
      <div className="input-group autocomplete">
        <input
          value={props?.params?.q}
          onChange={props?.handleSearch}
          id="search_blogs"
          className="search_input"
          type="text"
          name="search_blogs"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="basic-addon2"
        />
        <button className="input-group-append">
          <Svg
            className="search-svg-container"
            svg={`<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><title>Search</title><path d="M9.516 14.016q1.875 0 3.188-1.313t1.313-3.188-1.313-3.188-3.188-1.313-3.188 1.313-1.313 3.188 1.313 3.188 3.188 1.313zM15.516 14.016l4.969 4.969-1.5 1.5-4.969-4.969v-0.797l-0.281-0.281q-1.781 1.547-4.219 1.547-2.719 0-4.617-1.875t-1.898-4.594 1.898-4.617 4.617-1.898 4.594 1.898 1.875 4.617q0 0.984-0.469 2.227t-1.078 1.992l0.281 0.281h0.797z"></path></svg>`}
          />
        </button>
      </div>
    </form>
  );
}

export default InnerSearch;
