import { useLocation, useNavigate } from "react-router-dom";
import "./FavoritePage.css";
import { getFavorite } from "@/components/customized/Controller/APIController/FavoriteHandler";
import Cards from "@/components/customized/ui/Cards/Cards";
import { useEffect, useState } from "react";
import LoadingImg from "@/assets/images/Loading.gif";

export default function FavoritePage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search); // Access query string
  const navigate = useNavigate();
  const [Results, setResults] = useState([]);
  const [totalPages, setTotalPages] = useState(500);

  const [loading, setLoading] = useState(
    `${location.pathname}?${queryParams.toString()}`
  );

  const load = async () => {
    let page = queryParams.get("page") || 1;
    let [results, pageSize] = await getFavorite(page);
    console.log(results);
    console.log(pageSize);
    setResults(results);
    setTotalPages(pageSize);
  };
  const changePage = (e) => {
    const target = e.target;
    let page = queryParams.get("page") || "1";
    page = +page;
    switch (target.innerHTML) {
      case "«": {
        queryParams.set("page", 1);
        break;
      }
      case "←": {
        queryParams.set("page", page - 1);
        break;
      }
      case "→": {
        queryParams.set("page", page + 1);
        break;
      }
      case "»": {
        queryParams.set("page", totalPages);
        break;
      }
      default: {
        queryParams.set("page", +target.innerHTML);
      }
    }
    navigate(`${location.pathname}?${queryParams.toString()}`); //
  };

  const showPages = () => {
    let pages = [];
    if (totalPages === 1) {
      return;
    }
    let page = queryParams.get("page") || "1";
    page = +page;
    if (page > 1) {
      pages.push(
        <li onClick={changePage} key={1000}>
          «
        </li>
      );
      pages.push(
        <li onClick={changePage} key={1001}>
          ←
        </li>
      );
    }
    if (page > 2) {
      pages.push(
        <li onClick={changePage} key={1002}>
          {page - 2}
        </li>
      );
      pages.push(
        <li onClick={changePage} key={1003}>
          {page - 1}
        </li>
      );
    }
    if (page == 2) {
      pages.push(
        <li onClick={changePage} key={1004}>
          {page - 1}
        </li>
      );
    }
    pages.push(
      <li onClick={changePage} className="active" key={1005}>
        {page}
      </li>
    );
    if (page < totalPages) {
      pages.push(
        <li onClick={changePage} key={1006}>
          {page + 1}
        </li>
      );
      if (page + 1 < totalPages) {
        pages.push(
          <li onClick={changePage} key={1007}>
            {page + 2}
          </li>
        );
      }
      pages.push(
        <li onClick={changePage} key={1008}>
          →
        </li>
      );
      pages.push(
        <li onClick={changePage} key={1009}>
          »
        </li>
      );
    }
    return pages;
  };
  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (loading === `${location.pathname}?${queryParams.toString()}`) {
      return;
    }
    setLoading(`${location.pathname}?${queryParams.toString()}`);
    document.querySelector(".page").style.display = "none";
    document.querySelector(".loading").style.display = "flex";
    load();
  });

  useEffect(() => {
    if (Results.length > 0) {
      document.querySelector(".page").style.display = "";
      document.querySelector(".loading").style.display = "";
    }
  }, [Results]);
  const s = () => {
    return Results.length == 0 || totalPages == 0 ? { display: "none" } : {};
  };
  const s2 = () => {
    return Results.length == 0 && totalPages > 0 ? { display: "flex" } : {};
  };
  const s3 = () => {
    return totalPages > 0 ? { display: "none" } : {};
  };
  return (
    <div className="ResultPage">
      <div className="page" style={s()}>
        <div className="FilterContainer">
          <div className="filter-show">
            <h1>Favorites</h1>
          </div>
        </div>
        <div className="pageNumbers">
          <ul>{showPages()}</ul>
        </div>
        <Cards Results={Results} Type={"movie"} />
        <div className="pageNumbers">
          <ul>{showPages()}</ul>
        </div>
      </div>
      <div className="loading" style={s2()}>
        <img src={LoadingImg} />
      </div>
      <div className="Note" style={s3()}>
        <p>You have not added any media to favorites Yet &#128517;</p>
      </div>
    </div>
  );
}
