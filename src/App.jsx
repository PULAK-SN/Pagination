import React, { useEffect, useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import "./App.css";

const PAGE__SIZE = 10;

const Products = ({ image, title }) => {
  return (
    <div className="product">
      <img src={image} alt={title} />
      <span className="title">{title}</span>
    </div>
  );
};

const App = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const start = currentPage * PAGE__SIZE;
  const end = start + PAGE__SIZE;

  const noOfPage = Math.ceil(products.length / PAGE__SIZE);
  const pageNo = [...Array(noOfPage).keys()];

  const fetchData = async () => {
    const data = await fetch("https://dummyjson.com/products?limit=194");
    const json = await data.json();
    setProducts(json.products);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handelAppClick = (e) => {
    const event = e.target;
    // console.log(event.target.closest(".page").dataset.page);
    // Finds the nearest matching ancestor up the DOM tree

    // Only matches the clicked element, not its parent
    // if (event.target.className == "page") console.log("Pgae");
    const pageEl = event.closest(".page");
    if (pageEl) {
      const item = parseInt(pageEl.dataset.page);
      setCurrentPage(item);
    }

    if (event.closest(".page__container-arrow")) {
      if (event.closest(".go-start")) setCurrentPage(0);
      else if (event.closest(".go-end")) setCurrentPage(pageNo.length - 1);
      else if (event.closest(".goToPrev"))
        currentPage && setCurrentPage((prev) => prev - 1);
      else if (event.closest(".goToNext"))
        if (currentPage < pageNo.length - 1) setCurrentPage((prev) => prev + 1);
    }
  };

  return !products.length ? (
    <h1>No data found</h1>
  ) : (
    <div className="app" onClick={handelAppClick}>
      <h1>Pagination</h1>

      <div className="page__container">
        <button>
          <KeyboardDoubleArrowLeftIcon className="page__container-arrow go-start" />
        </button>

        <button disabled={currentPage === 0}>
          <ChevronLeftIcon className="page__container-arrow goToPrev" />
        </button>

        {pageNo.map((page) => (
          <div
            className={"page " + (page === currentPage ? "active" : "")}
            key={page}
            data-page={page}
          >
            <strong>{page + 1}</strong>
          </div>
        ))}
        <button disabled={currentPage === noOfPage - 1}>
          <KeyboardArrowRightIcon className="page__container-arrow goToNext" />
        </button>

        <button>
          <KeyboardDoubleArrowRightIcon className="page__container-arrow go-end" />
        </button>
      </div>

      <div className="pageNo">
        <strong>Page no. {currentPage + 1}</strong>
      </div>

      <div className="product__container">
        {products.slice(start, end).map((p) => (
          <Products key={p.id} title={p.title} image={p.thumbnail} />
        ))}
      </div>
    </div>
  );
};

export default App;
