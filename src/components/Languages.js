import React, { Fragment } from "react";
import useDataApi from "../utils/useDataApi";
import logo from "../logo.svg";

import languagesStyles from "./languages.module.scss";

function Languages({ match }) {
  const [{ data, isLoading, isError }] = useDataApi(
    `https://api.github.com/repos/${match.params.owner}/${match.params.repo}/languages`
  );

  return (
    <Fragment>
      {isError && <div>Something went wrong ...</div>}

      {isLoading || !data ? (
        <img src={logo} className="App-logo" alt="loading" />
      ) : (
        <ul className={languagesStyles.ul}>
          <div>Built with:</div>
          {Object.keys(data).map((item) => (
            <li key={item} className={languagesStyles.li}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
}

export default Languages;
