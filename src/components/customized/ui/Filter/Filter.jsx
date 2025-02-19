/* eslint-disable react/prop-types */
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./Filter.css";
import SearchIcon from "@/assets/images/search.png";
import CloseIcon from "@/assets/images/close.png";
import FilterIcon from "@/assets/images/filter.png";
export default function Filter() {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search); // Access query string

  const generateGenre = () => {
    const genres = [
      "Action",
      "Action & Adventure",
      "Adventure",
      "Animation",
      "Biography",
      "Comedy",
      "Documentary",
      "Drama",
      "Family",
      "Fantasy",
      "History",
      "Horror",
      "Kids",
      "Music",
      "Mystery",
      "News",
      "Reality",
      "Romance",
      "Sci-Fi & Fantasy",
      "Science Fiction",
      "Soap",
      "Talk",
      "Thriller",
      "TV Movie",
      "War",
      "War & Politics",
      "Western",
    ];
    let array = [];
    for (let i = 0; i < genres.length; i++) {
      array.push(
        <div className="singleElement" key={2000 + i}>
          <input
            type="checkbox"
            id={genres[i]}
            name="genre"
            value={genres[i]}
          />
          <label htmlFor={genres[i]}>{genres[i]}</label>
        </div>
      );
    }
    return array;
  };
  const generateCountries = () => {
    const Countries = [
      "Argentina",
      "Australia",
      "Austria",
      "Belgium",
      "Brazil",
      "Canada",
      "China",
      "Czech Republic",
      "Denmark",
      "Egypt",
      "Finland",
      "France",
      "Germany",
      "Hong Kong",
      "Hungary",
      "India",
      "Ireland",
      "Italy",
      "Japan",
      "Luxembourg",
      "Mexico",
      "Netherlands",
      "New Zealand",
      "Norway",
      "Poland",
      "Romania",
      "Russia",
      "South Africa",
      "South Korea",
      "Spain",
      "Sweden",
      "Switzerland",
      "Taiwan",
      "Thailand",
      "United Kingdom",
      "United States of America",
    ];
    let array = [];
    for (let i = 0; i < Countries.length; i++) {
      array.push(
        <div className="singleElement" key={3000 + i}>
          <input
            type="checkbox"
            id={Countries[i]}
            value={Countries[i]}
            name="country"
          />
          <label htmlFor={Countries[i]}>{Countries[i]}</label>
        </div>
      );
    }
    return array;
  };
  let filterObject = {
    type: "",
    year: "",
    genre: [],
    country: [],
    search: "",
    person: "",
  };
  const resetFilterObject = () => {
    filterObject = {
      type: "movie",
      year: "",
      genre: [],
      country: [],
      search: "",
      person: "",
    };
  };
  const setFilterRouter = (filter) => {
    let url = "/result/" + filter.type + "/?";

    if (filter.country.length > 0) {
      url += "country=" + filter.country.join("-") + "&";
    }
    if (filter.genre.length > 0) {
      url += "genre=" + filter.genre.join("-") + "&";
    }
    if (filter.year) {
      url += "year=" + filter.year + "&";
    }

    if (filter.search) {
      url += "search=" + filter.search + "&";
    }
    if (filter.person) {
      url += "person=" + filter.person + "&";
    }
    if (url[url.length - 1] === "&") {
      url = url.substring(0, url.length - 1);
    }

    navigate(url);
  };
  const setFilter = () => {
    resetFilterObject();
    // type filter
    const type = document.querySelector('input[name="type"]:checked');
    filterObject.type = type ? type.value : "movie";

    // year filter
    const year = document.querySelector('input[name="year"]:checked');
    filterObject.year = year ? year.value : "";

    // genre filter
    const genre =
      document.querySelectorAll('input[name="genre"]:checked') || [];
    genre.forEach((e) => {
      filterObject.genre.push(e.value);
    });

    // country filter
    const country =
      document.querySelectorAll('input[name="country"]:checked') || [];
    country.forEach((e) => {
      filterObject.country.push(e.value);
    });

    toggle();
    setFilterRouter(filterObject);
  };

  const setSearch = () => {
    resetFilterObject();
    const search = document.querySelector("input[type='text']");
    if (search && search.value.length > 0) {
      filterObject.search = search.value;
      filterObject.type = "search";
      setFilterRouter(filterObject);
      close();
      search.value = "";
    }
  };

  const unChecked = () => {
    let allInputs = document.querySelectorAll("input") || [];
    allInputs.forEach((i) => {
      i.checked = false;
    });
  };
  const toggle = () => {
    if (document.querySelector(".Filter").style.display) {
      document.querySelector(".Filter").style.display = "";
      unChecked();
    } else {
      document.querySelector(".Filter").style.display = "block";
    }
  };
  const close = () => {
    if (document.querySelector(".Filter").style.display) {
      document.querySelector(".Filter").style.display = "";
      unChecked();
    }
  };

  const setTargetKeywords = (e) => {
    resetFilterObject();
    filterObject.type = e.target.innerHTML.toLowerCase();
    setFilterRouter(filterObject);
  };

  return (
    <div className="FilterContainer">
      <div className="targetKeywords">
        <button
          onClick={setTargetKeywords}
          className={params && params.type == "now playing" ? "active" : ""}
        >
          Now Playing
        </button>
        <button
          onClick={setTargetKeywords}
          className={params && params.type == "popular" ? "active" : ""}
        >
          Popular
        </button>
        <button
          onClick={setTargetKeywords}
          className={params && params.type == "top rated" ? "active" : ""}
        >
          Top Rated
        </button>
        <button
          onClick={setTargetKeywords}
          className={params && params.type == "upcoming" ? "active" : ""}
        >
          Upcoming
        </button>
        <button
          onClick={setTargetKeywords}
          className={params && params.type == "people" ? "active" : ""}
        >
          People
        </button>
      </div>

      <div className="SearchButton">
        <input type="text" />
        <button onClick={setSearch}>Search</button>
      </div>

      <div className="filter-show">
        <h1>
          {params.type === "person" ? queryParams.get("name") : params.type}
        </h1>
        <button onClick={toggle}>
          <img src={FilterIcon} alt="filter" />
          Filter
        </button>
      </div>

      <div className="Filter">
        <div className="TypeFilter">
          <p>Type:</p>
          <div className="TypeSelection">
            <div className="singleElement">
              <input type="radio" id="All" name="type" value="all" />{" "}
              <label htmlFor="All">All</label>
            </div>
            <div className="singleElement">
              <input type="radio" id="Movies" name="type" value="movie" />
              <label htmlFor="Movies">Movies</label>
            </div>
            <div className="singleElement">
              <input type="radio" id="TV" name="type" value="tv" />
              <label htmlFor="TV">TV Shows</label>
            </div>
          </div>
        </div>

        <div className="TypeFilter">
          <p>Released:</p>
          <div className="TypeSelection">
            <div className="singleElement">
              <input type="radio" id="yearAll" name="year" value="all" />
              <label htmlFor="yearAll">All</label>
            </div>
            <div className="singleElement">
              <input type="radio" id="2024" name="year" value="2024" />
              <label htmlFor="2024">2024</label>
            </div>
            <div className="singleElement">
              <input type="radio" id="2023" name="year" value="2023" />
              <label htmlFor="2023">2023</label>
            </div>
            <div className="singleElement">
              <input type="radio" id="2022" name="year" value="2022" />
              <label htmlFor="2022">2022</label>
            </div>
            <div className="singleElement">
              <input type="radio" id="2021" name="year" value="2021" />
              <label htmlFor="2021">2021</label>
            </div>
            <div className="singleElement">
              <input type="radio" id="2020" name="year" value="2020" />
              <label htmlFor="2020">2020</label>
            </div>
            <div className="singleElement">
              <input type="radio" id="Older" name="year" value="older" />
              <label htmlFor="Older">Older</label>
            </div>
          </div>
        </div>

        <div className="TypeFilter">
          <p>Genre:</p>
          <div className="TypeSelection">{generateGenre()}</div>
        </div>

        <div className="TypeFilter">
          <p>Country:</p>
          <div className="TypeSelection">{generateCountries()}</div>
        </div>
        <div className="FilterFunctions">
          <button onClick={setFilter}>
            <img src={SearchIcon} alt="Search" />
            Filter
          </button>
          <button onClick={toggle}>
            <img src={CloseIcon} alt="Close" />
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
