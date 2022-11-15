import React from "react";

function SortBy(props) {
  return (
    <select onChange={props.onChangeSortBy}>
      <option value="0"> Sort By </option>
      <option value="1">Trending</option>
      <option value="blog.id desc">Latest</option>
      <option value="blog.id asc">Oldest</option>
      <option value="blog.id desc">Most Rated</option>
      <option value="comments_count desc">Most Commented</option>
      <option value="likes_count desc">Most Liked</option>
      <option value="shares_count desc">Most Shared</option>
    </select>
  );
}

export default SortBy;
