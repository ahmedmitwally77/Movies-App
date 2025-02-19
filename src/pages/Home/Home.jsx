/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
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
import MovieBox from "@/components/MovieBox/MovieBox";

const Home = () => {
  const { isMobile } = useIsMobile();
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [topRated, setTopRated] = useState([]);

  const getTrendingMovies = () => {
    axios
      .get(`/trending/movie/day`)
      .then((res) => {
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
        setTopRated(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };



  useEffect(() => {
    getTrendingMovies();
    getNowMovies();
    getTopRated();
  }, []);

  return (
    <div className="pt-20">
      {/* start swiper */}
      <div>
        <Swiper
          pagination={true}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="lg:w-[90%] w-[100%] md:h-[200px] lg:h-[400px] rounded-md"
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
          <h2 className="text-white font-bold text-[40px] mb-5 flex items-center gap-3">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0 1 18 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0 1 18 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 0 1 6 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5" />
          </svg>
            </span>
            Trending Movies
          </h2>
          <div className="flex flex-wrap justify-center pb-20 mt-5">
            {trendingMovies.slice(0, 15).map((movie, idx) => (
              <MovieBox movie={movie} idx={idx} key={idx} />
            ))}
          </div>
        </div>
      </div>
      {/* end Trending */}

      {/* start Now */}
      <div className="container">
        <div className="mt-10">
          <h2 className="text-white font-bold text-[40px] mb-5 flex items-center gap-3">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0 1 18 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0 1 18 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 0 1 6 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5" />
          </svg>
            </span>
            Now Playing
          </h2>

          <div className="flex flex-wrap justify-center pb-20 mt-5 ">
            {nowPlaying.slice(0, 15).map((movie, idx) => (
              <MovieBox key={idx} movie={movie} />
            ))}
          </div>
        </div>
      </div>
      {/* end Now */}

      {/* start Top */}
      <div className="container">
        <div className="mt-10">
          <h2 className="text-white font-bold text-[40px] mb-5 flex items-center gap-3">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0 1 18 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0 1 18 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 0 1 6 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5" />
          </svg>
            </span>
            Top Rated
          </h2>
          <div className="flex flex-wrap justify-center pb-20 mt-5">
            {topRated.slice(0, 15).map((movie, idx) => (
              <MovieBox key={idx} movie={movie} idx={idx} />
            ))}
          </div>
        </div>
      </div>
      {/* end Top */}
    </div>
  );
};

export default Home;
