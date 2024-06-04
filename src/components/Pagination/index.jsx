import Proptypes from "prop-types";
// import styles from "./index.module.css";

const Pagination = ({ pagination, handlePagination }) => {
  const isNextDisabled = pagination.skip + pagination.limit >= pagination.total;

  return (
    <>
      <select
        value={pagination.limit}
        onChange={(e) =>
          handlePagination({ action: "limit", limit: e.target.value })
        }
      >
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
      <button
        disabled={pagination.skip === 0}
        onClick={() => handlePagination({ action: "first" })}
      >
        First
      </button>
      <button
        disabled={pagination.skip === 0}
        onClick={() => handlePagination({ action: "previous" })}
      >
        Previous
      </button>
      <button
        disabled={isNextDisabled}
        onClick={() => handlePagination({ action: "next" })}
      >
        Next
      </button>
      <button
        disabled={isNextDisabled}
        onClick={() => handlePagination({ action: "last" })}
      >
        Last
      </button>
    </>
  );
};

Pagination.propTypes = {
  pagination: Proptypes.object.isRequired,
  handlePagination: Proptypes.func.isRequired,
};

export default Pagination;
