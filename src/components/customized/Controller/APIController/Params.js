import {
  getCountryCodes,
  getPrimaryLanguage,
  getGenreCodes,
  getTvGenreCodes,
} from "./HelperMethods";

export function getMovieParams(filter) {
  let params = "";
  if (filter.filter.year != "all") {
    if (filter.filter.year === "older") {
      params += "release_date.lte=" + `${2019}-12-31&`;
    } else {
      params += "primary_release_year=" + filter.filter.year + "&";
    }
  }

  if (filter.filter.country) {
    let countries = filter.filter.country
      .map((country) => getCountryCodes(country))
      .join("|");
    let languages = filter.filter.country
      .map((country) => getPrimaryLanguage(country))
      .join("|");

    params += "with_origin_country=" + countries + "&";
    params += "language=" + languages + "&";
  }
  if (filter.filter.genre) {
    let genres = getGenreCodes(filter.filter.genre).join(",");
    params += "with_genres=" + genres + "&";
  }
  
  return params;
}

export function getTVParams(filter) {
  let params = "";
  if (filter.filter.year != "all") {
    if (filter.filter.year === "older") {
      params += "first_air_date.lte=" + `${2019}-12-31&`;
    } else {
      params += "first_air_date_year=" + filter.filter.year + "&";
    }
  }

  if (filter.filter.country) {
    let countries = filter.filter.country
      .map((country) => getCountryCodes(country))
      .join("|");
    let languages = filter.filter.country
      .map((country) => getPrimaryLanguage(country))
      .join("|");

    params += "with_origin_country=" + countries + "&";

    params += "language=" + languages + "&";
  }
  if (filter.filter.genre) {
    let genres = getTvGenreCodes(filter.filter.genre).join(",");
    params += "with_genres=" + genres + "&";
  }
  return params;
}

export function getSearchParams(filter) {
  let params = "";
  params += "query=" + filter.filter.search;
  return params;
}

export function getNowPlayingParams() {
  let params = "";
  return params;
}
export function getPopularParams() {
  let params = "";
  return params;
}
export function getTopRatedParams() {
  let params = "";
  return params;
}
export function getUpcomingParams() {
  let params = "";
  return params;
}
export function getPeopleParams() {
  let params = "";
  return params;
}
export function getPersonParams() {
  let params = "";
  return params;
}
