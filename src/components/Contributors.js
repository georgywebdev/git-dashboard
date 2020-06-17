import React, { Fragment } from "react";
import useDataApi from "../utils/useDataApi";
import logo from "../logo.svg";

import contributorsStyles from "./contributors.module.scss";

function Contributors({ match }) {
  const [{ data, isLoading, isError }] = useDataApi(
    `https://api.github.com/repos/${match.params.owner}/${match.params.repo}/contributors?&per_page=10`
  );

  return (
    <Fragment>
      {isError && <div>Something went wrong ...</div>}

      {isLoading || !data ? (
        <img src={logo} className="App-logo" alt="loading" />
      ) : (
        <ul className={contributorsStyles.ul}>
          <div>Top Contributors:</div>
          {data.map((item) => (
            <li key={item.id} className={contributorsStyles.li}>
              <div className={contributorsStyles.container}>
                <a href={item.html_url} className={contributorsStyles.a}>
                  {item.login}
                </a>
                <img
                  src={item.avatar_url}
                  alt="avatar"
                  className={contributorsStyles.avatar}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
}

export default Contributors;
