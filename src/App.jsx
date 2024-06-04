import { useState, useEffect } from "react";
import Pagination from "./components/Pagination";
import Table from "./components/Table";

const App = () => {
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState("desc");

  const handleSort = (column) => {
    const currentOrder = order === "desc" ? "asc" : "desc";
    const sortedProducts = [...products].sort((a, b) => {
      if (currentOrder === "asc") return a[column] > b[column] ? 1 : -1;
      if (currentOrder === "desc") return b[column] > a[column] ? 1 : -1;
    });
    setProducts(sortedProducts);
    setOrder(currentOrder);
  };

  useEffect(() => {
    fetch(
      "https://dummyjson.com/products?limit=10&skip=10&select=title,price,brand,category&sortBy=price&order=desc"
    )
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  return (
    <div>
      MITSIT ASSIGNMENT
      <Table list={products} handleSort={handleSort} />
      <Pagination />
    </div>
  );
};

export default App;
