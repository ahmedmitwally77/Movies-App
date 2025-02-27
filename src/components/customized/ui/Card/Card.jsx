/* eslint-disable react/prop-types */

import "./Card.css";
import { useNavigate } from "react-router-dom";

export default function Card({ all, imageSource, title, first, second, type }) {
  const navigate = useNavigate();

  const onclick = () => {
    if (type == "person") {
      if (all.id) {
        navigate("/ActorDetails/" + "/?" + "person=" + all.id);
      }
    } else {
      navigate(`/FilmDetails/${type}/${all.id}`);
    }
  };
  return (
    <div className="Card" onClick={onclick}>
      <div className="posterHolder overflow-hidden">
        <img src={imageSource} alt={title} className=" " />
      </div>
      <a href="">{title}</a>
      <div className="posterInformation">
        <div className="left">
          <span>{type != "person" && first}</span>
          {type != "person" && <span className="dot"></span>}
          <span>{type != "person" && second}</span>
        </div>
        <div className="right">
          <span>
            {type == "tv"
              ? type.toUpperCase()
              : type == "movie"
              ? "Movie"
              : type}
          </span>
        </div>
      </div>
    </div>
  );
}
