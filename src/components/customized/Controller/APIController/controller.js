import {
  getMovieParams,
  getNowPlayingParams,
  getPeopleParams,
  getPersonParams,
  getPopularParams,
  getSearchParams,
  getTVParams,
  getTopRatedParams,
  getUpcomingParams,
} from "./Params";
export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNjBhM2ViMDhhMWQ5Y2RjY2E1NGZjNjcwMTgxMmFjOCIsIm5iZiI6MTcyODM5OTU2NS43NTE0Miwic3ViIjoiNjZmOTgyNjIxYTljOTE4OGZlY2M2M2RjIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.keNsd-uSLYEfqV7UebVqVQcph1bHJFI1bdE-Wn7_FNU",
  },
};
export const options2 = {
  method: "POST",
  headers: {
    accept: "application/json",
    "content-type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNjBhM2ViMDhhMWQ5Y2RjY2E1NGZjNjcwMTgxMmFjOCIsIm5iZiI6MTcyODgzNzEzNS4wNDc0NDMsInN1YiI6IjY2Zjk4MjYyMWE5YzkxODhmZWNjNjNkYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zxd5_bfFTMTI8-WCbWxQqFbNjgdIBQi80U1n9PekP4c",
  },
};
export const OmarOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    "content-type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOGYwYjA3YmJiOGVhYmJhN2JkYWIwYWY3NjZkYzRkNCIsIm5iZiI6MTcyODIxODc1MS43OTY1MSwic3ViIjoiNjVlYzc0NWEzMDgxMzEwMTgzNGQyODQxIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.VbzcySwlO4Gq0d7ZTh3e2mSkoACLIgC32OXatut07Cc",
  },
};
export function getAPI(filter) {
  if (filter.filter.type === "all") {
    return [
      "https://api.themoviedb.org/3/discover/movie",
      "https://api.themoviedb.org/3/discover/tv",
    ];
  } else if (filter.filter.type === "movie") {
    return ["https://api.themoviedb.org/3/discover/movie"];
  } else if (filter.filter.type === "tv") {
    return ["https://api.themoviedb.org/3/discover/tv"];
  } else if (filter.filter.type === "search") {
    return ["https://api.themoviedb.org/3/search/multi"];
  } else if (filter.filter.type === "now playing") {
    return [
      "https://api.themoviedb.org/3/movie/now_playing",
      "https://api.themoviedb.org/3/tv/on_the_air",
    ];
  } else if (filter.filter.type === "popular") {
    return [
      "https://api.themoviedb.org/3/movie/popular",
      "https://api.themoviedb.org/3/tv/popular",
    ];
  } else if (filter.filter.type === "top rated") {
    return [
      "https://api.themoviedb.org/3/movie/top_rated",
      "https://api.themoviedb.org/3/tv/top_rated",
    ];
  } else if (filter.filter.type === "upcoming") {
    return [
      "https://api.themoviedb.org/3/movie/upcoming",
      "https://api.themoviedb.org/3/tv/on_the_air",
    ];
  } else if (filter.filter.type === "people") {
    return ["https://api.themoviedb.org/3/person/popular"];
  } else if (filter.filter.type === "person") {
    return [
      `https://api.themoviedb.org/3/person/${filter.filter.person}/combined_credits`,
    ];
  }
}
export function getParams(filter) {
  let params = "?";
  if (filter.filter.page) {
    params += "page=" + filter.filter.page + "&";
  }
  if (filter.filter.type === "movie" || filter.filter.type === "all") {
    params += getMovieParams(filter);
  } else if (filter.filter.type === "tv") {
    params += getTVParams(filter);
  } else if (filter.filter.type === "search") {
    params += getSearchParams(filter);
  } else if (filter.filter.type === "now playing") {
    params += getNowPlayingParams(filter);
  } else if (filter.filter.type === "popular") {
    params += getPopularParams(filter);
  } else if (filter.filter.type === "top rated") {
    params += getTopRatedParams(filter);
  } else if (filter.filter.type === "upcoming") {
    params += getUpcomingParams(filter);
  } else if (filter.filter.type === "people") {
    params += getPeopleParams(filter);
  } else if (filter.filter.type === "person") {
    params += getPersonParams(filter);
  }
  if (params === "?") {
    return "";
  }
  if (params[params.length - 1] === "&") {
    params = params.substring(0, params.length - 1);
  }
  return params;
}
