import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import cover1 from "../../assets/cover1.png";
import cover2 from "../../assets/cover2.png";
import "./style.css";
import useIsMobile from "@/hooks/useIsMobile";
import axios from "@/api/axios";
import { IMAGE_BASE_URL } from "@/constants/constants";
import { Link, useNavigation } from "react-router-dom";

const Home = () => {
  const { isMobile } = useIsMobile();
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const nav = useNavigation();

  const getTrendingMovies = () => {
    axios
      .get(`/trending/movie/day`)
      .then((res) => {
        console.log(res.data.results);
        setTrendingMovies(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getNowMovies = () => {
    axios
      .get(`/movie/now_playing`)
      .then((res) => {
        console.log("now_playing", res.data.results);
        setNowPlaying(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTopRated = () => {
    axios
      .get(`/movie/top_rated`)
      .then((res) => {
        console.log("top_rated", res.data.results);
        setTopRated(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const navToFilmDetails = (id) => {
    nav(`FilmDetails/${id}`);
  };

  useEffect(() => {
    getTrendingMovies();
    getNowMovies();
    getTopRated();
  }, []);

  return (
    <div className="bg-[#44406F] pt-20">
      {/* start swiper */}
      <div>
        <Swiper
          pagination={true}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="w-[90%] md:h-[400px] rounded-md"
        >
          {isMobile ? (
            <>
              <SwiperSlide>
                <img
                  src={cover2}
                  alt="cover image"
                  className="md:object-cover"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src={cover1}
                  alt="cover image"
                  className="md:object-cover"
                />
              </SwiperSlide>
            </>
          ) : (
            <>
              <SwiperSlide className="relative">
                <img
                  src={cover2}
                  alt="cover image"
                  className="md:object-cover"
                />
                <div className="absolute text-white w-1/4 start-20">
                  <h3 className="font-bold text-[30px] mb-7">The Batman</h3>
                  <h6 className="text-[15px] mb-6">
                    When a sadistic serial killer begins murdering key political
                    figures in Gotham, The Batman is forced to investigate the
                    city's hidden corruption and question his family's
                    involvement.
                  </h6>
                  <h6 className="text-[15px] mt-3 mb-3">
                    Action Crime Drama Mystery Thriller
                  </h6>
                  <div className="flex flex-row gap-3 items-center justify-center">
                    <div className="flex flex-row gap-3 items-center">
                      <i className="fa-brands fa-imdb bg-[#FFD600] text-black"></i>
                      <span>
                        7.8/<span>10</span>
                      </span>
                    </div>
                    <div className="flex flex-row gap-3 items-center">
                      <i className="fa-solid fa-clock text-[#FFD600]"></i>
                      <span>2h 56m</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="relative">
                <img
                  src={cover1}
                  alt="cover image"
                  className="md:object-cover"
                />
                <div className="absolute text-white w-1/4 start-20">
                  <h3 className="font-bold text-[30px] mb-7">Peaky Blinders</h3>
                  <h6 className="text-[15px] mb-6">
                    A gangster family epic set in 1900s England, centering on a
                    gang who sew razor blades in the peaks of their caps, and
                    their fierce boss Tommy Shelby.
                  </h6>
                  <h6 className="text-[15px] mt-3 mb-3">Action Crime Drama</h6>
                  <div className="flex flex-row gap-3 items-center justify-center">
                    <div className="flex flex-row gap-3 items-center">
                      <i className="fa-brands fa-imdb bg-[#FFD600] text-black"></i>
                      <span>
                        8.8/<span>10</span>
                      </span>
                    </div>
                    <div className="flex flex-row gap-3 items-center">
                      <i className="fa-solid fa-clock text-[#FFD600]"></i>
                      <span>TV Series - 1h</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </>
          )}
        </Swiper>
      </div>
      {/* end swiper */}

      {/* start Trending */}
      <div className="container">
        <div className="mt-20">
          <h2 className="text-white font-thin text-[40px] mb-5">
            Trending Movies
          </h2>
          <div className="flex flex-wrap justify-between pb-20 mt-5 gap-2">
            {trendingMovies.slice(0, 10).map((movie, idx) => (
              <div
                className="group w-full md:w-1/6 mb-8 cursor-pointer"
                key={idx}
              >
                <Link to={`/FilmDetails/movie/${movie.id}`}>
                  <div className="relative">
                    <img
                      // src={film}
                      src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                      alt="Film"
                      className="w-full rounded-md"
                    />
                  </div>
                  <h6 className="text-white text-[18px] font-semibold mt-1 mb-1">
                    {movie.title}
                  </h6>
                  <div className="flex flex-row justify-between items-center">
                    <span className="text-white">
                      {movie.release_date.split("-")[0]}{" "}
                      {movie.vote_average == 0 ? null : (
                        <>
                          - {movie.vote_average.toFixed(1)}
                          <i className="fa-solid fa-star text-[#FFD600] ms-1"></i>
                        </>
                      )}
                    </span>
                    <span className="text-white border-2 px-1 rounded-sm">
                      {movie.media_type}
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* end Trending */}

      {/* start Now */}
      <div className="container">
        <div className="mt-10">
          <h2 className="text-white font-thin text-[40px] mb-5">Now Playing</h2>
          <div className="flex flex-wrap justify-between pb-20 mt-5 gap-2">
            {nowPlaying.slice(0, 10).map((movie, idx) => (
              <div
                className="group w-full md:w-1/6 mb-8 cursor-pointer"
                key={idx}
              >
                <Link to={`/FilmDetails/movie/${movie.id}`}>
                  <div className="relative">
                    <img
                      // src={film}
                      src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                      alt="Film"
                      className="w-full rounded-md"
                    />
                  </div>
                  <h6 className="text-white text-[18px] font-semibold mt-1 mb-1">
                    {movie.title}
                  </h6>
                  <div className="flex flex-row justify-between items-center">
                    <span className="text-white">
                      {movie.release_date.split("-")[0]}{" "}
                      {movie.vote_average == 0 ? null : (
                        <>
                          - {movie.vote_average.toFixed(1)}
                          <i className="fa-solid fa-star text-[#FFD600] ms-1"></i>
                        </>
                      )}
                    </span>
                    {/* <span className='text-white border-2 px-1 rounded-sm'>{movie.media_type}</span> */}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* end Now */}

      {/* start Top */}
      <div className="container">
        <div className="mt-10">
          <h2 className="text-white font-thin text-[40px] mb-5">Top Rated</h2>
          <div className="flex flex-wrap justify-between pb-20 mt-5 gap-2">
            {topRated.slice(0, 10).map((movie, idx) => (
              <div
                className="group w-full md:w-1/6 mb-8 cursor-pointer"
                key={idx}
              >
                <Link to={`/FilmDetails/movie/${movie.id}`}>
                  <div className="relative">
                    <img
                      // src={film}
                      src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                      alt="Film"
                      className="w-full rounded-md"
                    />
                  </div>
                  <h6 className="text-white text-[18px] font-semibold mt-1 mb-1">
                    {movie.title}
                  </h6>
                  <div className="flex flex-row justify-between items-center">
                    <span className="text-white">
                      {movie.release_date.split("-")[0]}{" "}
                      {movie.vote_average == 0 ? null : (
                        <>
                          - {movie.vote_average.toFixed(1)}
                          <i className="fa-solid fa-star text-[#FFD600] ms-1"></i>
                        </>
                      )}
                    </span>
                    {/* <span className='text-white border-2 px-1 rounded-sm'>{movie.media_type}</span> */}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* end Top */}
    </div>
  );
};

export default Home;
