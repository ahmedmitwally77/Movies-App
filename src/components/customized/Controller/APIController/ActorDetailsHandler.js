import { options } from "./controller";

export async function getActorDetails(actorID) {
  let response = await fetch(
    "https://api.themoviedb.org/3/person/" + actorID,
    options
  );
  if (response.status === 200) {
    response = await response.json();
    return response;
  } else {
    return null;
  }
}
