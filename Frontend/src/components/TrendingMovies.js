import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, EffectFade, Mousewheel, Keyboard } from 'swiper';
import { FreeMode } from 'swiper';
// Sample data (Replace this with your actual data or API fetch)
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

const TrendingMovie = ({ movies }) => {
  return (
    <div className="transition-all duration-150 w-full mb-2 md:mb-0 mx-auto flex flex-col gap-3 md:gap-4 z-30 -mt-2 md:mt-[-24vh] xl:max-w-[92%]">
      <div className="font-medium flex items-center gap-2 tracking-wide w-full px-2 lg:px-3 text-white text-lg md:text-2xl py-1 z-50 flex-shrink-0">
        <div className="h-[1.4rem] p-[3px] md:h-[1.5rem] flex items-center justify-center rounded bg-[#4f46e5]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="white"
            stroke="white"
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
      <div className="pl-3 lg:pl-4 w-full relative overflow-hidden">
        <Swiper
          spaceBetween={10}
          slidesPerView="auto"
          freeMode={true}
          className="xl:rounded-3xl"
          modules={[FreeMode, Navigation, Pagination, Mousewheel, Scrollbar, A11y, EffectFade, Keyboard]}
            keyboard={true}
            pagination
            draggable
        >
          {movies?.slice(0,50).map((movie) => (
            <SwiperSlide
              key={movie.id}
              className="aspect-[2/1] h-fit rounded-2xl lg:rounded-3xl overflow-hidden active:scale-[.98] transition-transform duration-300 ease-linear"
              style={{ width: '347.714px' }}
            >
              <a
                className="relative h-full w-full flex flex-col gap-2 flex-shrink-0 bg-[var(--light)] group active:scale-100"
                href={
                    movie.media_type === 'movie'
                        ? `/movie/${movie.id}`
                        : `/tv/${movie.id}`
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2cdfff"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="absolute z-30 group-hover:opacity-100 opacity-0 top-2 right-2 smoothie"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polygon points="10 8 16 12 10 16 10 8"></polygon>
                </svg>
                <div className="z-0">
                  <img
                    src={`https://image.tmdb.org/t/p/w1280${movie?.backdrop_path}`}
                    alt={movie.title}
                    className="w-full h-full object-cover object-center group-hover:scale-[1.03] smoothie !duration-300"
                  />
                </div>
                <div className="flex flex-col hover:ring-[2px] ring-[#2cd5ff] ring-inset gradient-opacity absolute w-full h-full gap-1 md:gap-2 justify-end bottom-0 right-0 left-0 pb-2 px-3 lg:px-5 lg:pb-3 smoothie rounded-2xl lg:rounded-3xl">
                  <div className="line-clamp-2 uppercase tracking-wide text-white !leading-none text-sm md:text-base font-bold">
                    {movie.original_name || movie.original_title}
                  </div>
                  <div className="flex flex-wrap text-xs !leading-tight text-[#2cdfff] font-normal tracking-wider gap-1">
                    <span>Rating: {movie.vote_average.toFixed(1)}</span>
                    <span>•</span>
                    <span>{movie.release_date?.substring(0,4) || movie.first_air_date?.substring(0,4)}</span>
                    <span>•</span>
                    <span className="uppercase">{movie.language}</span>
                  </div>
                </div>
              </a>
            </SwiperSlide>
          ))}
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
