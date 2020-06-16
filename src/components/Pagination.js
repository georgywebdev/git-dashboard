import React from "react";

import paginationStyles from "./pagination.module.scss";

function Pagination({ totalPosts, handlePageChange, activePage, match }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / 10); i++) {
    if (i > 10) {
      break;
    }
    pageNumbers.push(i);
  }

  return (
    <div className={paginationStyles.table}>
      <ul className={paginationStyles.ul}>
        {pageNumbers.map((page) => (
          <li key={page} className={paginationStyles.li}>
            <button
              onClick={() => handlePageChange(page)}
              className={
                page === parseInt(match.params.page)
                  ? paginationStyles.selected
                  : paginationStyles.regular
              }
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pagination;
