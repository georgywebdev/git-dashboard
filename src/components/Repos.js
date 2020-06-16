import React, { Fragment } from "react";
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Link } from "react-router-dom";
import moment from "moment";
import logo from "../logo.svg";
import reposStyles from "./repos.module.scss";

function Repos({ data, isLoading, isError }) {
  return (
    <Fragment>
      {isError && <div>Something went wrong ...</div>}
      {isLoading ? (
        <img src={logo} className="App-logo" alt="loading" />
      ) : (
        <div className={reposStyles.repolist}>
          {data.items.map((item) => (
            <div key={item.id} className={reposStyles.repoitem}>
              <Link
                to={`/repos/${item.full_name}`}
                className={reposStyles.link}
              >
                {item.full_name}
              </Link>
              <span className={reposStyles.span}>
                <img
                  src="https://img.icons8.com/fluent/48/000000/star-filled.png"
                  alt="star icon"
                  className={reposStyles.star}
                />
                : {item.stargazers_count}
              </span>
              Last updated:
              <span className={reposStyles.span}>
                {moment(item.updated_at).fromNow()}
              </span>
              <a href={item.html_url}>
                <img
                  src="https://img.icons8.com/material-outlined/48/000000/external-link.png"
                  className={reposStyles.linkimg}
                  alt=""
                />
              </a>
            </div>
          ))}
        </div>
      )}
    </Fragment>
  );
}

export default Repos;
