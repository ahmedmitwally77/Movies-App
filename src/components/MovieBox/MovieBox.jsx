/* eslint-disable react/prop-types */
import { IMAGE_BASE_URL } from "@/constants/constants";
import { Link } from 'react-router-dom';

export default function MovieBox({movie, idx}) {
  const{poster_path, title, release_date, vote_average, media_type, id} = movie
  return (
    <div
                className="group w-1/2 p-2 md:w-1/4 sm:w-1/3 lg:w-1/5 mb-8 cursor-pointer"
                key={idx}
              >
                <Link to={`/FilmDetails/movie/${id}`}>
                  <div className="relative overflow-hidden">
                    <img
                      src={`${IMAGE_BASE_URL}${poster_path}`}
                      alt={`${title} Film ${idx}`}
                      className="w-full rounded-md hover:scale-125 overflow-hidden hover:rotate-6 duration-500 transition-all"
                    />
                  </div>
                  <h6 className="text-white line-clamp-1 text-[18px] py-1 font-semibold mt-1">
                    {title}
                  </h6>
                  <div className="flex flex-row justify-between items-center">
                    <span className="text-white">
                      {release_date.split("-")[0]}{" "}
                      {vote_average == 0 ? null : (
                        <>
                          - {vote_average.toFixed(1)}
                          <i className="fa-solid fa-star text-[#FFD600] ms-1"></i>
                        </>
                      )}
                    </span>
                    <span className="text-white border-2 p-1 rounded-md transition-all duration-500 hover:bg-white hover:!text-primary">
                      {media_type? media_type : "movie"}
                    </span>
                  </div>
                </Link>
              </div>
  )
}
