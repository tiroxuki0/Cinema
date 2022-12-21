import axios from "axios";
import { memo, useEffect, useState } from "react";
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from "react-icons/ai";

const PagePagination = ({ headingRef, handleChangePage, genresID }) => {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  console.log("render");

  useEffect(() => {
    /* get pages */
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=6b2dec73b6697866a50cdaef60ccffcb&sort_by=popularity.desc&include_adult=false&with_genres=28`
      )
      .then((res) => {
        setTotalPage(res.data.total_pages);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setPage(1);
  }, [genresID]);

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
      handleChangePage(page - 1);
      headingRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNext = () => {
    if (page < totalPage) {
      setPage(page + 1);
      handleChangePage(page + 1);
      headingRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="pagination:container">
      <div className="pagination:number arrow" onClick={handlePrev}>
        <AiOutlineDoubleLeft />
      </div>

      <div className="pagination:number">{page}</div>

      <div className="pagination:number">of</div>

      <div className="pagination:number">{totalPage}</div>

      <div className="pagination:number arrow" onClick={handleNext}>
        <AiOutlineDoubleRight />
      </div>
    </div>
  );
};

export default memo(PagePagination);
