import React, { useEffect } from 'react'
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, EffectFade, Mousewheel, Keyboard } from 'swiper';
import { FreeMode } from 'swiper';
import 'swiper/css/free-mode';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import TrendCard from './TrendCard';
import { Link, useNavigate } from 'react-router-dom';
import TrendingMovies from './TrendingMovies';
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import TrailersBlock from './TrailersBlock';

const Home = () => {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [tvshows, setTvShows] = useState([]);
    const [page, setPage] = useState(1);
    const [tvpage, setTvPage] = useState(1);
    const [totaltvpages, setTotalTvPages] = useState(0);
    const [totalpages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [searchquery, setSearchQuery] = useState("");
    const [featuredMovies, setFeaturedMovies] = useState(null);
    const [trendingMovies, setTrendingMovies] = useState(null);
    let user = '';
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1, // Adjust number of slides based on screen size
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
    };

    useEffect(() => {
        const gettmdbData = async () => {
            const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=748d8f1491929887f482d9767de12ea8`;
            const response = await fetch(url);
            const data = await response.json();
            setMovies(data.results);
            setTotalPages(data.total_pages)
            setPage(page + 1)
        }
        const gettmdbtvData = async () => {
            const url = `https://api.themoviedb.org/3/trending/tv/week?api_key=748d8f1491929887f482d9767de12ea8`;
            const response = await fetch(url);
            const data = await response.json();
            setTvShows(data.results);
            setTotalTvPages(data.total_pages)
            setTvPage(tvpage + 1)
        }
        const fetchPopularMovie = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/popular?api_key=748d8f1491929887f482d9767de12ea8`
                );
                const data = await response.json();
                console.log(data.results.slice(0, 10));
                setFeaturedMovies(data.results.slice(0, 10));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        const fetchTrendingData = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/trending/all/day?api_key=748d8f1491929887f482d9767de12ea8`
                );
                const data = await response.json();
                setTrendingMovies(data.results.slice(0, 6));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };


        if (localStorage.getItem('user') || sessionStorage.getItem('user')) {
            user = JSON.parse(sessionStorage.getItem('user') || localStorage.getItem('user'));
            gettmdbData();
            gettmdbtvData();
            fetchPopularMovie();
            fetchTrendingData();
            
            // getData() ;
            var x = document.getElementById("loading-bar");
            for (let i = 0; i < 4; i++) {
                setTimeout(() => {
                    x.classList.remove(`w-[${(i) * 25}%]`);
                    x.classList.add(`w-[${(i + 1) * 25}%]`);
                }, 100);
            }
            x.classList.remove("w-[100%]");
            setTimeout(() => {
                setLoading(false);
            }, 350);
            setTimeout(() => {
                x.classList.add("w-0")
            }, 400);
        }
        else {
            navigate("/");
        }

        // const getData= async() => {
        //     const url = `${host}movies/allposts` ;
        //     const response = await fetch(url , {
        //         method: 'GET', 
        //         headers: {
        //             'Content-Type': 'application/json' ,
        //         },
        //     });
        //     const data = await response.json() ;

        //     setMovies(data) ; 

        // }

        // eslint-disable-next-line
    }, [])
    const fetchMoreData = async () => {
        const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=748d8f1491929887f482d9767de12ea8&page=${page}`;
        let response = await fetch(url);
        let data = await response.json();
        setMovies(movies.concat(data.results));
        setPage(page + 1);
    };
    const fetchMoretvData = async () => {
        const url = `https://api.themoviedb.org/3/trending/tv/week?api_key=748d8f1491929887f482d9767de12ea8&page=${page}`;
        let response = await fetch(url);
        let data = await response.json();
        setTvShows(tvshows.concat(data.results));
        setTvPage(tvpage + 1);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/search/${searchquery}`);
    }

    return (
        <div className='relative h-screen' style={{
            scrollbarColor: "rgb(255 255 255 / 0.5) transparent",
            scrollbarWidth: "thin",
            msScrollbarArrowColor: "transparent",
            scrollBehavior: "smooth",
          }} >
            <div className='h-[2px]  w-full z-[99999999] absolute '>
                <div id="loading-bar" className='transition-all w-[0%] h-full bg-red-800'>
                </div>
            </div>
            <ToastContainer />
            {/* <img className='absolute z-[999] transition-all duration-500 w-full h-96 object-cover  top-16' src={home} alt="" />
            <form onSubmit={handleSubmit} className='absolute z-[999] mt-[350px] w-full  '>
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
                <div className="relative mx-4 md:w-4/6 md:mx-auto">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <input type="search" id="default-search" className="block p-1.5 pl-10 md:p-3 md:pl-10 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:shadow-lg outline-none" onChange={(e) => { setSearchQuery(e.target.value) }} placeholder="Search Movies & TV Shows" required />
                    <Link to={`search/${searchquery}`}>
                    <button disabled={searchquery.length ===0}  type="submit" onClick={handleSubmit} className="text-white absolute md:right-[7px] md:bottom-[7px] bottom-[7px] right-[7px] bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg md:text-sm text-[13px] px-2 py-[2px] md:px-4 md:py-2 ">Search</button></Link>
                    
                </div>
            </form> */}
            <Swiper
                modules={[FreeMode, Navigation, Pagination, Mousewheel, Scrollbar, A11y, EffectFade, Keyboard]}
                keyboard={true}
                pagination
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                  }}
                className="mySwiper"
            >
                {featuredMovies?.map((featuredMovie) => (
                    <SwiperSlide key={featuredMovie.id}>
                        <div key={featuredMovie?.id} className="transition-all duration-200 bg-cover bg-center h-[60vh] md:h-[70vh] lg:h-screen " >
                            <div className="w-full h-[60vh] md:h-[60vh] lg:h-screen">
                                <span
                                    className="lazy-load-image-background opacity lazy-load-image-loaded"
                                    style={{
                                        color: "transparent",
                                        display: "inline-block",
                                        height: "100%",
                                        width: "100%",
                                    }}
                                >
                                    <LazyLoadImage
                                        src={`https://image.tmdb.org/t/p/w1280/${featuredMovie?.backdrop_path}`}
                                        width="100%"
                                        height="100%"
                                        className="w-full h-full object-cover"
                                        alt="Background"
                                        effect="blur"
                                        visibleByDefault={true}
                                    />
                                </span>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-transparent  to-[rgba(0,0,0,0.30)]"></div>
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(0,0,0,0.30)] to-[rgba(0,0,0,0.98)]"></div>
                            {/* <div className="absolute bottom-0 left-0 w-full h-full">
                                <div className="bg-gradient-to-t from-black/50 to-transparent h-[100%]"></div>
                            </div> */}

                            <div className="absolute transition-all duration-200 flex flex-col gap-2 md:gap-4 tracking-wide w-[87%] sm:w-[70%] md:w-[50%] left-[5%] bottom-[8%] md:bottom-[28vh] xl:bottom-[30vh]">
                                <div className="flex flex-col gap-1 md:gap-2">
                                    <div className="line-clamp-2 text-white font-semibold leading-tight text-2xl md:text-3xl lg:text-4xl py-1 flex-shrink-0">{featuredMovie?.title}</div>
                                    <div className="text-xs 2xl:text-sm tracking-wider text-white/90 flex gap-3 ">
                                        <span className="flex items-center gap-1 rounded-md">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="whitesmoke" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-star">
                                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                            </svg>
                                            <span className="">{featuredMovie?.vote_average.toFixed(1)}</span>
                                        </span>
                                        <span className="flex gap-1 ">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-calendar-range">
                                                <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                                                <line x1="16" x2="16" y1="2" y2="6"></line>
                                                <line x1="8" x2="8" y1="2" y2="6"></line>
                                                <line x1="3" x2="21" y1="10" y2="10"></line>
                                                <path d="M17 14h-6"></path>
                                                <path d="M13 18H7"></path>
                                                <path d="M7 14h.01"></path>
                                                <path d="M17 18h.01"></path>
                                            </svg>
                                            <span>{featuredMovie?.release_date}</span>
                                        </span>
                                        <span className="flex items-center gap-1 "><span className="uppercase">en</span><span>•</span><span>HD</span></span>
                                    </div>
                                </div>
                                <div title={featuredMovie?.title} className="leading-tight text-md text-slate-200 line-clamp-2 md:line-clamp-3 lg:leading-snug overflow-hidden text-ellipsis whitespace-nowrap ">{`${featuredMovie?.overview}`}</div>
                                <div className="flex gap-2 mt-2">
                                    <a href={`movie/watch/${featuredMovie?.id}`} className="bg-white/80 backdrop-blur-md gap-1 font-semibold flex-shrink-0 text-black text-sm md:text-base p-2 md:py-[.65rem] rounded-full lg:rounded-lg overflow-hidden hover:brightness-[.8] justify-center items-center flex w-[7rem] md:w-[10rem]" >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="black" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-play">
                                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                        </svg>
                                        Play <span className="md:block hidden">Now</span>
                                    </a>
                                    <Link to={`/movie/${featuredMovie?.id}`} className="bg-[#e6e5eb33] gap-1 font-medium text-[whitesmoke] text-sm md:text-base p-2 md:py-[.65rem] rounded-full lg:rounded-lg overflow-hidden hover:bg-white/10 justify-center tracking-wide items-center flex w-[7rem] md:w-[10rem]" >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-info">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <path d="M12 16v-4"></path>
                                            <path d="M12 8h.01"></path>
                                        </svg>
                                        <span className="md:block hidden">More</span> Info
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {!loading && <TrendingMovies trendingMovies={trendingMovies} />}

            {!loading && <TrailersBlock />}

            {!loading && <div className='bg-[#000000]/90 md:mt-20 xl:mt-0  mx-auto  pb-12 w-[100%] xl:max-w-[92%]'>

                <h1 className='mt-10 mx-4 z-50 text-white font-medium md:text-xl'>Trending Movies</h1>
                <div className='mx-2 pt-2'>
                    <Swiper
                        freeMode={true}
                        grabCursor={true}
                        modules={[FreeMode, Navigation, Pagination, Mousewheel, Scrollbar, A11y, EffectFade, Keyboard]}
                        keyboard={true}
                        height={400}
                        draggable={true}
                        style={{
                            '--swiper-navigation-color': '#fff',
                            '--swiper-pagination-color': '#fff',
                          }}
                        className="mySwiper px-2 "
                        breakpoints={{
                            320: {
                                slidesPerView: 2,
                                spaceBetween: 10
                            },
                            480: {
                                slidesPerView: 4,
                                spaceBetween: 10
                            },
                            768: {
                                slidesPerView: 6,
                                spaceBetween: 10
                            },

                        }}
                        onReachEnd={() => {
                            if (page < totalpages) {
                                fetchMoreData();
                            }
                        }}
                    >

                        {movies?.map((element, index) => {

                            if (loading === false) {
                                return (
                                    <SwiperSlide 
                                    key={index}
                                    
                                    >
                                        <div className='transition-all duration-500 rounded-3xl relative' key={index}>
                                            <TrendCard movieData={element} />
                                        </div>
                                    </SwiperSlide>
                                )
                            }
                            return (<div></div>);

                        })}

                    </Swiper>
                </div>
                <div className='w-full flex justify-end'>
                    <Link to="/movie/trending" className="m-4 place-content-end text-white bg-white/50 backdrop-blur-md hover:brightness-[.8] font-medium rounded-lg md:text-sm px-3 text-[12px] py-1 md:px-5 md:py-2.5 text-center inline-flex items-center">
                        Show More
                        <svg className="w-3 h-3 md:w-5 md:h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </Link>
                </div>

                <h1 className='mt-10 mx-4 font-medium z-50 text-white md:text-xl'>Trending TV Shows</h1>
                <div className='mx-2 pt-2'>
                    <Swiper
                        freeMode={true}
                        grabCursor={true}
                        modules={[FreeMode, Navigation, Pagination, Scrollbar, A11y, EffectFade]}
                        draggable={true}
                        style={{
                            '--swiper-navigation-color': '#fff',
                            '--swiper-pagination-color': '#fff',
                          }}
                        className="mySwiper px-2"
                        onReachEnd={() => {
                            if (tvpage < totaltvpages) {
                                fetchMoretvData();
                            }
                        }}
                        breakpoints={{
                            320: {
                                slidesPerView: 2,
                                spaceBetween: 10
                            },
                            480: {
                                slidesPerView: 4,
                                spaceBetween: 10
                            },
                            768: {
                                slidesPerView: 6,
                                spaceBetween: 10
                            },

                        }}
                    >

                        {tvshows?.map((element, index) => {

                            if (loading === false) {
                                return (
                                    <SwiperSlide key={index}>
                                        <div className='transition-all duration-500' key={index}>
                                            <TrendCard movieData={element} />
                                        </div>
                                    </SwiperSlide>
                                )
                            }
                            return (<div></div>);

                        })}


                    </Swiper>
                </div>
                <div className='w-full flex justify-end'>
                    <Link to="/tv/trending" className="m-4 place-content-end text-white font-medium rounded-lg md:text-sm px-3 text-6[12px] py-1 md:px-5 md:py-2.5 text-center inline-flex items-center bg-white/50 backdrop-blur-md hover:brightness-[.8] ">
                        Show More
                        <svg className="w-3 h-3 md:w-5 md:h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </Link>
                </div>
            </div>}
        </div>
    )
}

export default Home