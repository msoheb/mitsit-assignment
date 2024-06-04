import { useEffect, useReducer } from "react";
import Pagination from "./components/Pagination";
import Table from "./components/Table";

const initialState = {
  products: [],
  order: "desc",
  total: 0,
  skip: 0,
  limit: 10,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_PRODUCTS_BY_ORDER":
      return { ...state, ...action.payload };
    case "LIMIT":
      return { ...state, limit: action.payload };
    case "FIRST":
      return { ...state, skip: 0 };
    case "LAST":
      return { ...state, skip: state.total - state.limit };
    case "NEXT":
      return {
        ...state,
        skip: Math.min(state.skip + state.limit, state.total - state.limit),
      };
    case "PREVIOUS":
      return { ...state, skip: Math.max(state.skip - state.limit, 0) };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const pagination = {
    total: state.total,
    skip: state.skip,
    limit: state.limit,
  };

  const handleSort = (column) => {
    const currentOrder = state.order === "desc" ? "asc" : "desc";
    const sortedProducts = [...state.products].sort((a, b) => {
      if (currentOrder === "asc") return a[column] > b[column] ? 1 : -1;
      if (currentOrder === "desc") return b[column] > a[column] ? 1 : -1;
    });
    const payload = {
      products: sortedProducts,
      order: currentOrder,
    };
    dispatch({ type: "FETCH_PRODUCTS_BY_ORDER", payload });
  };

  const fetchProducts = async ({ skip, limit }) => {
    const API = `https://dummyjson.com/products?limit=${limit}&skip=${skip}&select=title,price,brand,category&sortBy=price&order=desc`;
    await fetch(API)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "FETCH_PRODUCTS_BY_ORDER", payload: data });
      });
  };

  useEffect(() => {
    fetchProducts({ skip: state.skip, limit: state.limit });
  }, [state.limit, state.skip]);

  return (
    <div>
      MITSIT ASSIGNMENT
      <Table list={state.products} handleSort={handleSort} />
      <Pagination pagination={pagination} dispatch={dispatch} />
    </div>
  );
};

export default App;
