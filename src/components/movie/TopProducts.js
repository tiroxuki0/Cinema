import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import useActive from "../../hooks/useActive";
import MovieCardLoading from "./MovieCardLoading";
import PagePagination from "./PagePagination";
import ProductCard from "./MovieCard";
import { createArray } from "../../helpers/utils";
import Skeleton from "@mui/material/Skeleton";
import axios from "axios";

const TopProducts = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [page, setPage] = useState(1);
  const [genresID, setGenresID] = useState(28);
  const [genres, setGenres] = useState([]);
  const { activeClass, handleActive } = useActive(0);
  const headingRef = useRef();

  const handleChangePage = useCallback((pageNumb) => {
    setPage(pageNumb);
  }, []);

  useEffect(() => {
    /* get genres */
    axios
      .get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=6991946ce8c16cbb1b593830839da3bd&language=en-US`
      )
      .then((res) => {
        setGenres(res.data.genres);
      })
      .catch((err) => console.log(err));

    /* get movies */
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=6991946ce8c16cbb1b593830839da3bd&sort_by=popularity.desc&include_adult=false&page=${page}&with_genres=${genresID}`
      )
      .then((res) => {
        setMoviesData(res.data.results);
      })
      .catch((err) => console.log(err));
  }, [page, genresID]);

  // handling product's filtering
  const handleMovies = (item, i) => {
    // setProducts(filteredProducts);
    handleActive(i);
    setGenresID(item.id);
  };

  return (
    <>
      {/* genres */}
      {genres.length === 0 ? (
        <div className="products_filter_tabs" ref={headingRef}>
          <ul className="tabs">
            {createArray(9, null).map((item, i) => (
              <li key={i}>
                <Skeleton
                  sx={{ bgcolor: "grey.900" }}
                  width={100}
                  height={50}
                />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="products_filter_tabs" ref={headingRef}>
          <ul className="tabs">
            {genres.map((item, i) => (
              <li
                key={item.id}
                className={`tabs_item ${activeClass(i)}`}
                onClick={() => handleMovies(item, i)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* movies */}
      {moviesData.length === 0 ? (
        <div className="wrapper products_wrapper">
          {createArray(7, null).map((item, i) => (
            <MovieCardLoading key={i} />
          ))}
          <div className="card products_card browse_card">
            <Link>
              Browse All <br /> Products <BsArrowRight />
            </Link>
          </div>
        </div>
      ) : (
        <div className="wrapper products_wrapper">
          {moviesData.map((item) => (
            <ProductCard key={item.id} {...item} />
          ))}
        </div>
      )}
      <PagePagination
        headingRef={headingRef}
        handleChangePage={handleChangePage}
        genresID={genresID}
      />
    </>
  );
};

export default TopProducts;
