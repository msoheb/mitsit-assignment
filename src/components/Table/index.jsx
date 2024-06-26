import PropTypes from "prop-types";
import styles from "./index.module.css";

const Table = ({ list, handleSort }) => {
  return (
    <div className={styles.tableContainer}>
      <table role="table" className={styles.table}>
        <thead>
          <tr>
            <th onClick={() => handleSort("title")}>Title</th>
            <th onClick={() => handleSort("brand")}>Brand</th>
            <th onClick={() => handleSort("category")}>Category</th>
            <th onClick={() => handleSort("price")}>Price</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.brand}</td>
                <td>{item.category}</td>
                <td>${item.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  list: PropTypes.array.isRequired,
  handleSort: PropTypes.func.isRequired,
};

export default Table;
