import React, { Fragment } from "react";
import moment from "moment";
import Repos from "./Repos";
import useDataApi from "../utils/useDataApi";

function Trending() {
  const [{ data, isLoading, isError }] = useDataApi(
    `https://api.github.com/search/repositories?q=created:>${moment()
      .subtract(7, "d")
      .format("YYYY-MM-DD")}&sort=stars&order=desc&per_page=10`,
    {
      items: [],
    }
  );

  // here i deciced to go for the top starred repositories in the last 7 days
  // because just the alltime top 10 repositories won't change around much and that'd be no fun
  // here's an optional query for the alltime top 10 repositories just in case
  // ?q=stars:>=100000&sort=stars&per_page=10&page=1

  return (
    <Fragment>
      <h3>Most popular repositories in the last 7 days</h3>
      <Repos data={data} isLoading={isLoading} isError={isError} />
    </Fragment>
  );
}

export default Trending;
