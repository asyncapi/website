import React from "react";
import Button from "../Button";

const Pagination = ({ issuesPerPage, currentPage, totalIssues, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalIssues / issuesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
      <span className="text-xs xs:text-sm text-gray-900">
        Showing {currentPage * issuesPerPage - issuesPerPage + 1} to{" "}
        {currentPage * issuesPerPage} of {totalIssues} Issues
      </span>
      <div className="inline-flex mt-2 xs:mt-0">
        <Button
          text="Prev"
          onClick={(event) => {
            event.preventDefault();
            if (currentPage - 1) paginate(currentPage - 1);
          }}
        />
        {pageNumbers.map((number) => (
          <Button
            key={number}
            text={number}
            onClick={(event) => {
              event.preventDefault();
              paginate(number);
            }}
          />
        ))}
        <Button
          text="Next"
          onClick={(event) => {
            event.preventDefault();
            if (currentPage < totalIssues / issuesPerPage)
              paginate(currentPage + 1);
          }}
        />
      </div>
    </div>
  );
};

export default Pagination;
