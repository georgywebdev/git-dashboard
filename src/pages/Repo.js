import React, { Fragment } from "react";
import moment from "moment";
import useDataApi from "../utils/useDataApi";
import Languages from "../components/Languages";
import Contributors from "../components/Contributors";

import repoStyles from "./repo.module.scss";
import logo from "../logo.svg";

function Repo({ match }) {
  const [{ data, isLoading, isError }] = useDataApi(
    `https://api.github.com/repos/${match.params.owner}/${match.params.repo}`
  );

  return (
    <Fragment>
      {isError && <div>Something went wrong ...</div>}

      {isLoading || !data ? (
        <img src={logo} className="App-logo" alt="loading" />
      ) : (
        <Fragment>
          <div>
            <div>{data.name}</div>
            <div>
              <img
                src="https://img.icons8.com/fluent/48/000000/star-filled.png"
                alt="star icon"
                className={repoStyles.star}
              />
              :{data.stargazers_count}
            </div>
            <div>
              Last updated:
              {moment(data.updated_at).fromNow()}
            </div>
            <div>
              <img
                src={data.owner.avatar_url}
                alt="avatar"
                className={repoStyles.avatar}
              />
            </div>
            <div>
              <a href={data.owner.html_url}>
                {data.owner.login}
                <img
                  src="https://img.icons8.com/material-outlined/24/000000/external-link.png"
                  className={repoStyles.linkimg}
                  alt=""
                />
              </a>
            </div>
            {data.description}
          </div>
          <Languages match={match} />
          <Contributors match={match} />
        </Fragment>
      )}
    </Fragment>
  );
}

export default Repo;
