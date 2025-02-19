/* eslint-disable react/prop-types */
import Card from "../Card/Card";
import "./Cards.css";

// eslint-disable-next-line react/prop-types
export default function Cards({ Results }) {
  const getImgSource = (response) => {
    if (response.profile_path) {
      return response.profile_path;
    } else if (response.poster_path) {
      return response.poster_path;
    } else if (response.backdrop_path) {
      return response.backdrop_path;
    } else {
      if (response.known_for) {
        let array =
          response.known_for.filter((f) => {
            if (f.backdrop_path) {
              return true;
            } else if (f.poster_path) {
              return true;
            }
          }) || [];
        return array.length > 0
          ? array[0].backdrop_path || array[0].poster_path
          : "";
      }
    }
  };
  const getFirst = (response) => {
    if (response.media_type) {
      if (response.media_type === "movie" && response.release_date) {
        return new Date(response.release_date || new Date()).getFullYear();
      } else if (response.media_type === "tv" && response.number_of_seasons) {
        return `SS ${response.number_of_seasons}`;
      } else {
        return response.first_air_date;
      }
    } else {
      let year = response.release_date || response.first_air_date;
      return new Date(year || new Date()).getFullYear();
    }
  };
  const getSecond = (response) => {
    if (response.media_type) {
      if (response.media_type === "movie" && response.runtime) {
        return response.runtime + "M";
      } else if (response.media_type === "tv" && response.number_of_episodes) {
        return `EPS ${response.number_of_episodes}`;
      } else {
        return "97M";
      }
    } else {
      return "97M";
    }
  };
  const init = () => {
    let array = [];
    for (let i = 0; i < Results.length; i++) {
      array.push(
        <Card
          key={i}
          imageSource={
            "https://image.tmdb.org/t/p/w500/" + getImgSource(Results[i])
          }
          all={Results[i]}
          title={Results[i].title || Results[i].name}
          type={Results[i].media_type || "person"}
          first={getFirst(Results[i])}
          second={getSecond(Results[i])}
        />
      );
    }
    return array;
  };
  return <div className="Cards">{init()}</div>;
}
