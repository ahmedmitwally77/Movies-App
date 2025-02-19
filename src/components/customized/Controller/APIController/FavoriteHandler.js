import { options, options2, OmarOptions } from "./controller";
import { moreDetails, shuffleArray } from "./fetch";
async function createRequestToken() {
  let response = await fetch(
    " https://api.themoviedb.org/3/authentication/token/new",
    options
  );
  response = await response.json();
  return response.request_token;
}

async function createSession() {
  let response = await fetch(
    "https://api.themoviedb.org/3/authentication/session/new",
    { ...options2, body: "7f5621b62589d2a467242137c905e59f55e37e17" }
  );
  response = await response.json();
  console.log(response);
  return response.session_id;
}
async function addFavorites() {
  let response = await fetch(
    "https://api.themoviedb.org/3/account/21544671/favorite?session_id=" +
      "c88fa4de1aa85a50de4cc52a38eac43cab5186a0",
    {
      ...options2,
      body: JSON.stringify({
        media_type: "movie", // or "tv"
        media_id: 594767, // TMDB movie or TV show ID
        favorite: true, // or false to remove from favorites
      }),
    }
  );
  response = await response.json();
  console.log(response);
  // return response.session_id;
}

function addMediaType(array, type) {
  for (let i = 0; i < array.length; i++) {
    array[i].media_type = type;
  }
  return array;
}

async function getMedia(page) {
  let fetches = [];
  let maxSize = -1;
  let APIS = [
    "https://api.themoviedb.org/3/account/21081425/favorite/movies",
    "https://api.themoviedb.org/3/account/21081425/favorite/tv",
  ];

  for (let i = 0; i < APIS.length; i++) {
    let response = await fetch(APIS[i] + `?page=${page}`, OmarOptions);
    response = await response.json();
    if (maxSize < response.total_pages) {
      maxSize = response.total_pages;
    }
    fetches.push(response);
  }

  let array = [];
  for (let i = 0; i < fetches.length; i++) {
    let newArray =
      i == 0
        ? addMediaType(fetches[i].results, "movie")
        : addMediaType(fetches[i].results, "tv");
    array = [...array, ...newArray];
  }
  return [shuffleArray(await moreDetails(array)), maxSize];
}

export async function getFavorite(page) {
  // let response = await fetch(
  //   "https://api.themoviedb.org/3/account/21544671/favorite/movies",
  //   options
  // );
  // response = await response.json();
  // return response.results;
  return await getMedia(page);
}

//7f5621b62589d2a467242137c905e59f55e37e17

//session id
//c88fa4de1aa85a50de4cc52a38eac43cab5186a0
