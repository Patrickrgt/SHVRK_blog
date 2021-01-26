import React from "react";
import _ from "lodash";
import fullcircle from "../img/fullcircle.png";
import halfcircle from "../img/halfcircle.png";

const Pagination = (props) => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;

  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav>
      <ul className="pagination">
        <div className="pagination-inner">
          {pages.map((page, index) => (
            <div key={index} className="pagination-div">
              {page === currentPage ? (
                <img src={fullcircle} alt="" />
              ) : (
                <img src={halfcircle} alt="" />
              )}

              {/* <li
              key={page}
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
            >
              <a className="page-link" onClick={() => onPageChange(page)}>
                {page}
              </a>
            </li> */}
            </div>
          ))}
        </div>
      </ul>
    </nav>
  );
};

export default Pagination;
