import { getAPI, getParams, options } from "./controller";

async function getFetch(request) {
  // let fetches = [];
  let APIS = getAPI(request);
  if (APIS.length == 1) {
    let response = await fetch(APIS[0] + getParams(request), options);
    response = await response.json();

    let result = [];
    if (response.results) {
      result = [...result, ...response.results];
    }
    if (response.crew && response.crew.length > 0) {
      result = [...result, ...response.crew];
    }
    if (response.cast && response.cast.length > 0) {
      result = [...result, ...response.cast];
    }

    for (let i = 0; i < result.length; i++) {
      if (!result[i].media_type) {
        result[i].media_type =
          (request.filter.type == "people" && "person") || request.filter.type;
      }
    }

    return {
      results: result,
      total_pages: response.total_pages,
    };
  } else if (APIS.length > 1) {
    return handleMultiResponse(APIS, request);
  }
}

export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

async function handleMultiResponse(APIS, { filter }) {
  let newFilter = filter;
  let fetches = [];
  let result = [];
  let start = +filter.page / 2 == 0 ? 10 : 0;
  let end = start + 10;
  let minSize = 100000;
  if (+filter.page > 1) newFilter = { ...filter, page: +filter.page - 1 };
  for (let i = 0; i < APIS.length; i++) {
    let response = await fetch(
      APIS[i] + getParams({ filter: newFilter }),
      options
    );
    response = await response.json();
    fetches.push(response);
  }
  for (let i = 0; i < fetches.length; i++) {
    result = [...result, ...fetches[i].results.slice(start, end)];
  }
  for (let i = 0; i < result.length; i++) {
    if (i < 10) {
      result[i].media_type = "movie";
    } else {
      result[i].media_type = "tv";
    }
  }
  for (let i = 0; i < fetches.length; i++) {
    if (minSize > fetches[i].total_pages / 2) {
      minSize = Math.floor(fetches[i].total_pages / 2);
    }
  }

  result = shuffleArray(result);

  return { results: result, total_pages: minSize * 2 };
}

export async function moreDetails(array) {
  let promises = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i].media_type === "movie") {
      promises.push(
        fetch(`https://api.themoviedb.org/3/movie/${array[i].id}`, options)
      );
    } else if (array[i].media_type === "tv") {
      promises.push(
        fetch(`https://api.themoviedb.org/3/tv/${array[i].id}`, options)
      );
    }
  }
  let response = await Promise.all(promises);
  for (let i = 0; i < response.length; i++) {
    let re = await response[i].json();
    if (array[i].media_type === "movie") {
      array[i].runtime = re.runtime;
    } else if (array[i].media_type === "tv") {
      array[i].number_of_seasons = re.number_of_seasons;
      array[i].number_of_episodes = re.number_of_episodes;
    }
  }
  return array;
}
export async function fetchHandler(request) {
  try {
    let response = await getFetch(request);
    let result = response.results || response.cast;

    if (response.total_pages) {
      return [
        await moreDetails(result),
        response.total_pages > 500 ? 500 : response.total_pages,
      ];
    } else {
      let size = result.length;
      let pageSize = Math.ceil(size / 20);
      let start = (+request.filter.page - 1) * 20;
      let end = start + 20 > size ? size : start + 20;
      return [await moreDetails(result.slice(start, end)), pageSize];
    }
  } catch (err) {
    console.error(err);
  }
}
