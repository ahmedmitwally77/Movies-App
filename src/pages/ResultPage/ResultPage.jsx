import { useLocation, useParams, useNavigate } from "react-router-dom";

import "./ResultPage.css";
import Search from "@/components/customized/Controller/Search/Search";
import Filter from "@/components/customized/ui/Filter/Filter";
import LoadingImg from "@/assets/images/Loading.gif";
import { useEffect, useRef, useState } from "react";
function ResultPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search); // Access query string
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(
    `${location.pathname}?${queryParams.toString()}`
  );
  const [totalPages, setTotalPages] = useState(500);

  const getFilter = () => {
    let filter = {
      type: "all",
      year: "all",
      genre: [],
      country: [],
      search: "",
      person: "",
      page: "1",
    };

    switch (params.type) {
      case "all":
      case "movie":
      case "tv":
      case "people":
      case "person":
      case "now playing":
      case "popular":
      case "search":
      case "top rated":
      case "upcoming": {
        filter.type = params.type;
        break;
      }
      default: {
        1 + 1;
      }
    }
    if (queryParams.get("country")) {
      filter.country = queryParams.get("country").split("-") || filter.country;
    }
    if (params.genre) {
      filter.genre = queryParams.get("genre").split("-") || filter.genre;
    }
    filter.year = queryParams.get("year") || filter.year;
    filter.search = queryParams.get("search") || filter.search;
    filter.person = queryParams.get("person") || filter.person;
    filter.page = queryParams.get("page") || filter.page;
    return filter;
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
  const d = useRef(<Search filter={getFilter()} set={setTotalPages} />);
  useEffect(() => {
    if (loading === `${location.pathname}?${queryParams.toString()}`) {
      return;
    }
    setLoading(`${location.pathname}?${queryParams.toString()}`);
    d.current = <Search filter={getFilter()} set={setTotalPages} />;
  });
  return (
    <div className="ResultPage">
      <div className="page">
        <Filter />
        <div className="pageNumbers">
          <ul>{showPages()}</ul>
        </div>
        {d.current}
        <div className="pageNumbers">
          <ul>{showPages()}</ul>
        </div>
      </div>

      <div className="loading">
        <img src={LoadingImg} />
      </div>
    </div>
  );
}

export default ResultPage;
