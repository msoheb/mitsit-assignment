import Proptypes from "prop-types";
import styles from "./index.module.css";

const Pagination = ({ pagination, dispatch }) => {
  const isNextDisabled = pagination.skip + pagination.limit >= pagination.total;

  return (
    <div className={styles.pagination}>
      <div>
        <select
          value={pagination.limit}
          onChange={(e) => dispatch({ type: "LIMIT", payload: e.target.value })}
        >
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        <button
          disabled={pagination.skip === 0}
          onClick={() => dispatch({ type: "FIRST" })}
        >
          First
        </button>
        <button
          disabled={pagination.skip === 0}
          onClick={() => dispatch({ type: "PREVIOUS" })}
        >
          Previous
        </button>
        <button
          disabled={isNextDisabled}
          onClick={() => dispatch({ type: "NEXT" })}
        >
          Next
        </button>
        <button
          disabled={isNextDisabled}
          onClick={() => dispatch({ type: "LAST" })}
        >
          Last
        </button>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  pagination: Proptypes.object.isRequired,
  dispatch: Proptypes.func.isRequired,
};

export default Pagination;
