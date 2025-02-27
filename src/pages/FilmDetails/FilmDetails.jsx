/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./css/filmdetals.css";
import axios from "@/api/axios";
import { useNavigate, useParams } from "react-router-dom";
import { IMAGE_BASE_URL } from "@/constants/constants";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import { PacmanLoader } from "react-spinners";

function FilmDetails() {
  const [isLoading, setIsLoading] = useState(false);
  const [filmDetails, setFilmDetails] = useState(null);
  const [filmVideos, setFilmVideos] = useState([]);
  const { id, type } = useParams();
  const nav = useNavigate();

  

  const getFilmDetails = () => {
    axios
      .get(`/${type}/${id}`)
      .then((res) => {
        console.log(res.data);
        setFilmDetails(res.data);
      })
      .catch((err) => {
        alert(err);
        nav("/home");
      });
  };

  const getFilmVideo = () => {
    axios
      .get(`/movie/${id}/videos`)
      .then((res) => {
        setFilmVideos(res.data.results);
      })
      .catch((err) => {
        alert(err);
        nav("/home");
      });
  };

  const filteredTrailer = filmVideos?.filter(
    (video) => video.type === "Trailer"
  );

  const addToFavourite = (id) => {
    const body = {
      media_type: "movie",
      media_id: id,
      favorite: true,
    };
    axios
      .post(
        `/account/21081425/favorite?session_id=${localStorage.getItem(
          "sessionId"
        )}`,
        body
      )
      .then((res) => {
        toast.success("Added to favourites Successfully", {
          position: "top-center",
        });
      })
      .catch((err) => {
        toast.error("Error Occured", { position: "top-center" });
      });
  };

  const getFav = () => {
    axios
      .get(`/account/21081425/favorite/movies`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getFilmDetails();
    getFilmVideo();
    getFav();
  }, []);

  // const dislike = (id) => {
  //   console.log("Disliked", id);
  //   setIsLoading(true);
  //   setTimeout(() => setIsLoading(false), 1000); // Simulate a delay
  // };
  const backgroundImageUrl = `${IMAGE_BASE_URL}${
    filmDetails && filmDetails.backdrop_path
  }`;
  const s1 = () => {
    return filmDetails == null
      ? { display: "none" }
      : {
          width: "100%",
          minHeight: "100vh",
          position: "relative",
          backgroundColor: "#f5f5f5",
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          overflow: "hidden",
          borderRadius: "20px",
        };
  };
  const s2 = () => {
    return filmDetails == null ? { display: "flex" } : {};
  };
  return (
    <>
      <div className="page" style={s1()}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.7)", // Adjust opacity/color as needed
            zIndex: 1,
            borderRadius: "20px",
          }}
        ></div>
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-3">
              <Card className="card" style={{ width: "100%", height: "auto" }}>
                <Card.Img
                  variant="top"
                  src={`${IMAGE_BASE_URL}${
                    filmDetails && filmDetails.poster_path
                  }`}
                />
                <Card.Body>
                  <div id="block-rating" className="block-rating p-3">
                    <div className="rating-result mb-3">
                    <div className="rr-mark">
                      <span>9.4</span>/ 106 voted
                    </div>
                    <ProgressBar now={94.34} className="mb-2" />
                  </div>

                    <div className="add-to-favoret-main text-center  py-3">
                      <Button
                        onClick={() => addToFavourite(filmDetails?.id)}
                        variant="primary"
                        className="add-to-favoret-btn rounded-5"
                      >
                        <i className="fa-regular fa-heart mt-2"></i> Add To
                        Favorite
                      </Button>
                      
                    </div>

                    {isLoading && (
                      <div style={{ marginTop: 40 }} id="vote-loading">
                        <div className="loading-relative">
                          <div className="loading">
                            <div className="span1"></div>
                            <div className="span2"></div>
                            <div className="span3"></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </div>
            <div
              className="col-md-6 offset-lg-1 col-lg-8"
              style={{
                position: "relative",
                zIndex: 2, // Ensures content is above the overlay
                color: "white", // Example text color
                padding: "20px",
              }}
            >
              <div className="card-content d-flex flex-column justify-content-center  align-items-start w-100 h-100 gap-3">
                <a
                  target="__blank"
                  href={`https://www.youtube.com/watch?v=${filteredTrailer[0]?.key}`}
                >
                  <Button className="button-85 mt-5 mb-3 " variant="primary">
                    <i className="fa fa-play mr-2"></i>Watch trailer
                  </Button>
                </a>
                <h2 className="md:text-6xl text-4xl  font-bold">
                  <a href="#">{filmDetails && filmDetails.original_title}</a>
                </h2>
                <div className="mb-2 lh-base w-3/4 text-gray-400">
                  {filmDetails && filmDetails.overview}
                </div>
                <div className="elements border-t-2 pt-4 ">
                  <div className="row">
                    <div className="col-xl-5 col-lg-6 col-md-8 col-sm-12">
                      <div className="row-line">
                        <span className="type">
                          <strong className="text-lg">Released: </strong>
                        </span>
                        {filmDetails &&
                          (filmDetails.release_date ||
                            filmDetails.first_air_date)}
                      </div>
                      <div className="row-line">
                        <span className="type">
                          <strong className="text-lg">Genre: </strong>
                        </span>
                        {filmDetails?.genres?.map((gen, idx) => (
                          <span key={idx}>
                            <a href="#" className="px-1" title={gen.name}>
                              {gen.name}
                            </a>
                            {idx < filmDetails &&
                              filmDetails.genres.length - 1 &&
                              ", "}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-4 col-sm-12">
                      <div className="row-line">
                        <span className="type">
                          <strong className="text-lg">Country: </strong>
                        </span>
                        <a href="/country/us" title="United States of America">
                          {filmDetails?.origin_country?.[0]}
                        </a>
                      </div>
                      <div className="row-line">
                        <span className="type">
                          <strong className="text-lg">Production: </strong>
                        </span>
                        {filmDetails?.production_companies?.map(
                          (company, idx) => (
                            <a key={idx} className="px-1" href="#" title={company?.name}>
                              {company?.name}
                            </a>
                          )
                        )}
                      </div>
                    </div>
                    <div className="clearfix"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
}

export default FilmDetails;
