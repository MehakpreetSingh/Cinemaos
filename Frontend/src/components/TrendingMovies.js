import React from 'react';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, EffectFade, Mousewheel, Keyboard } from 'swiper';
import { FreeMode } from 'swiper';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton'; import "react-loading-skeleton/dist/skeleton.css";


const movies = [
  {
    id: 1296838,
    title: "Die Hart 2: Die Harter",
    rating: 6.9,
    year: 2024,
    language: "en",
    img: "https://image.tmdb.org/t/p/w780/kVwgVQQO331jdUdOBYffGC2QjEp.jpg"
  },
  {
    id: 1077280,
    title: "Die Hart",
    rating: 5.9,
    year: 2023,
    language: "en",
    img: "https://image.tmdb.org/t/p/w780/path/to/image.jpg"
  }
  // Add more movies as needed
];

const TrendingMovie = ({movies}) => {
  useEffect(() => {
    
  }, []);
  return (
    <div className="transition-all duration-150 w-full mb-2 md:mb-0 mx-auto flex flex-col gap-3 md:gap-4  -mt-2 md:mt-[-24vh] xl:max-w-[92%]">
      <div className="font-medium flex items-center gap-2 tracking-wide w-full px-2 lg:px-3 text-white text-lg md:text-2xl py-1 z-20 flex-shrink-0">
        <div className="h-[1.4rem] p-[3px] md:h-[1.5rem] flex items-center justify-center rounded bg-[white]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="black"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-flame"
          >
            <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
          </svg>
        </div>
        What's Trending Today
      </div>
      <div className="px-3 lg:px-4 w-full relative overflow-hidden">
        <Swiper
          spaceBetween={10}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 10
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 10
            },

          }}
          freeMode={true}
          className=""
          modules={[FreeMode, Navigation, Pagination, Mousewheel, Scrollbar, A11y, EffectFade, Keyboard]}
          keyboard={true}
          pagination
          draggable
        >
          {movies?.map((movie) => (
              <SwiperSlide
                key={movie.id}
                className=""
              >
                <Link to={movie.media_type === 'movie'
                  ? `/movie/${movie.id}`
                  : `/tv/${movie.id}`}
                  className="group relative w-full flex-1 overflow-hidden rounded-2xl transition-all  bg-white">
                  <div className="relative w-full flex-1 overflow-hidden rounded-2xl bg-black transition-all">
                    <LazyLoadImage
                      src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                      alt=""
                      wrapperClassName="w-full h-full object-cover rounded-2xl"
                      wrapperProps={{
                        // If you need to, you can tweak the effect transition using the wrapper style.
                        style: { height: "100%", borderRadius: "1rem", },
                      }}
                      visibleByDefault={true}
                      effect='blur'
                    />
                    <div className="absolute opacity-0 group-hover:opacity-100 transition-all duration-300 inset-0 bg-gradient-to-t from-black to-[rgba(0,0,0,0.40)]"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.40)]"></div>
                    <div className="absolute w-[100vx] inset-x-0 bottom-0 bg-white/20 backdrop-blur-sm rounded-2xl p-2 pl-4">
                      <div>
                        <div className='flex flex-row items-center justify-between'>
                          <div className="flex flex-col justify-between w-full items-start">
                            <div className='flex items-center justify-between w-full'>
                              <h1 className="text-white w-[100%] text-[13px] font-bold ">
                                {movie.title || movie.name || movie.original_name}
                              </h1>
                              <Link to={movie.media_type === "movie" ? `/movie/watch/${movie.id}` : `/tv/${movie.id}/1/1`} className='text-white px-2 opacity-0 group-hover:opacity-100 transform-all duration-300 hover:scale-[1.2] rounded-full'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill='white' width="24" height="24" viewBox="0 0 24 24"><path d="M0 21v-18l15 9-15 9zm11-17v3.268l7.888 4.732-7.888 4.732v3.268l13-8-13-8z" /></svg>
                              </Link>
                            </div>
                            <div className='flex items-center justify-center w-full'>
                              <div className="flex items-center text-[10px] w-full my-1 space-x-1">
                                <span className="text-yellow-400 text-xs">★</span>
                                <span className="text-white font-bold">{movie.vote_average.toFixed(1)}</span>
                                <span className="text-white font-bold">|</span>
                                <span className="text-white font-bold">HD</span>
                                <span className="text-white font-bold">•</span>
                                <span className="text-white font-bold">{movie.media_type === "movie" ? "Movie" : "TV"}</span>
                              </div>
                              <div className="text-gray-100 text-[10px] pr-3">
                                {movie.release_date?.substring(0, 4) || movie.first_air_date?.substring(0, 4)}
                              </div>
                            </div>
                          </div>

                        </div>

                        <div className="grid grid-rows-[0fr] transition-all group-hover:grid-rows-[1fr]">
                          <p className="overflow-hidden text-white/70 opacity-0 transition duration-500 group-hover:opacity-100 text-white text-sm text-[10px]">
                            {movie.overview.substring(0, 300) + "..."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
    </div>
  );
};

const TrendingMovies = (props) => {
  return (
    <TrendingMovie movies={props.trendingMovies} />
  );
};

export default TrendingMovies;
