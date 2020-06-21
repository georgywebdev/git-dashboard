import React, { Fragment, useState, useEffect } from "react";

import Repos from "../components/Repos";
import useDataApi from "../utils/useDataApi";
import Pagination from "../components/Pagination";
import Trending from "../components/Trending";

import searchStyles from "./search.module.scss";

function Search({ history, match }) {
  const [query, setQuery] = useState(
    JSON.parse(localStorage.getItem("my-query")) || ""
  );
  const [activePage, setActivePage] = useState(
    JSON.parse(localStorage.getItem("my-activePage")) || 1
  );
  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    `https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc&page=${activePage}&per_page=10`,
    {
      items: [],
    }
  );

  //for browser navigation with forward/back
  useEffect(() => {
    if (match.params.query && match.params.page)
      doFetch(
        `https://api.github.com/search/repositories?q=${match.params.query}&sort=stars&order=desc&page=${match.params.page}&per_page=10`
      );
    console.log("hook");
    setQuery(match.params.query);
  }, [match.params.query, match.params.page, doFetch]);

  //localStorage caching
  useEffect(() => {
    localStorage.setItem("my-query", JSON.stringify(query));
  }, [query]);
  useEffect(() => {
    localStorage.setItem("my-activePage", JSON.stringify(activePage));
  }, [activePage]);

  const handlePageChange = (page) => {
    setActivePage(page);
    history.push(`/search/repositories/${query}/${page}`);
  };

  const handleSubmit = (event) => {
    if (query === "") return;
    event.preventDefault();
    doFetch(
      `https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc&page=1&per_page=10`
    );
    setActivePage(1);
    history.push(`/search/repositories/${query}/1`);
  };

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <Fragment>
      <div className={searchStyles.div}>
        <form onSubmit={handleSubmit} className="form">
          <input
            placeholder="Search for GitHub repos"
            type="text"
            value={query}
            onChange={handleChange}
          />
          <button type="submit" className={searchStyles.button}>
            Search
          </button>
        </form>
      </div>
      {query ? (
        <>
          <Repos isError={isError} isLoading={isLoading} data={data} />
          <Pagination
            match={match}
            totalPosts={data.total_count}
            handlePageChange={handlePageChange}
            activePage={activePage}
          />
        </>
      ) : (
        <Trending />
      )}
    </Fragment>
  );
}

export default Search;
