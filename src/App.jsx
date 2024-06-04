import { useState, useEffect } from "react";
import Pagination from "./components/Pagination";
import Table from "./components/Table";

const App = () => {
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState("desc");
  const [pagination, setPagination] = useState({
    total: 0,
    skip: 0,
    limit: 10,
  });

  const handlePagination = ({ limit, action }) => {
    if (action === "limit") {
      setPagination((prevState) => {
        return {
          ...prevState,
          limit,
        };
      });
    }
    if (action === "first") {
      setPagination((prevState) => {
        return {
          ...prevState,
          skip: 0,
        };
      });
    }
    if (action === "previous") {
      setPagination((prevState) => {
        return {
          ...prevState,
          skip: Math.max(pagination.skip - pagination.limit, 0),
        };
      });
    }
    if (action === "next") {
      setPagination((prevState) => {
        return {
          ...prevState,
          skip: Math.min(
            pagination.skip + pagination.limit,
            pagination.total - pagination.limit
          ),
        };
      });
    }
    if (action === "last") {
      setPagination((prevState) => {
        return {
          ...prevState,
          skip: pagination.total - pagination.limit,
        };
      });
    }
  };

  const handleSort = (column) => {
    const currentOrder = order === "desc" ? "asc" : "desc";
    const sortedProducts = [...products].sort((a, b) => {
      if (currentOrder === "asc") return a[column] > b[column] ? 1 : -1;
      if (currentOrder === "desc") return b[column] > a[column] ? 1 : -1;
    });
    setProducts(sortedProducts);
    setOrder(currentOrder);
  };

  const fetchProducts = ({ skip, limit }) => {
    fetch(
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}&select=title,price,brand,category&sortBy=price&order=desc`
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setPagination({
          total: data.total,
          limit: data.limit,
          skip: data.skip,
        });
      });
  };

  useEffect(() => {
    fetchProducts({ skip: pagination.skip, limit: pagination.limit });
  }, [pagination.limit, pagination.skip]);

  return (
    <div>
      MITSIT ASSIGNMENT
      <Table list={products} handleSort={handleSort} />
      <Pagination pagination={pagination} handlePagination={handlePagination} />
    </div>
  );
};

export default App;
