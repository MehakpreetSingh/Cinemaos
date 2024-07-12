import React from 'react';
import { useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component'
import "react-lazy-load-image-component/src/effects/blur.css";
import MovieHoverEffect from './MovieHoverEffect';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import {  Pagination, Keyboard, Autoplay } from 'swiper';
import { FreeMode } from 'swiper';
import 'swiper/css/free-mode';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';


const TopRated = () => {
    const [latesttrailers, setlatestTrailers] = useState(null);
    const [latesttvtrailers, setlatestTvTrailers] = useState(null);
    const latestMovies = "https://api.themoviedb.org/3/movie/top_rated?api_key=748d8f1491929887f482d9767de12ea8&language=en-US";
    const latesttv = "https://api.themoviedb.org/3/tv/top_rated?api_key=748d8f1491929887f482d9767de12ea8&language=en-US";
    const [selectedTab, setSelectedTab] = useState('movie');
    useEffect(() => {
        axios.get(latestMovies)
            .then((res) => {
                setlatestTrailers(res.data.results)
            })
            .catch((err) => {
                console.log(err)
            })
        axios.get(latesttv)
            .then((res) => {
                setlatestTvTrailers(res.data.results)
            }).catch((err) => {
                console.log(err)
            })
    }, [latesttrailers, setlatestTrailers]);
    const handletabChange = (tab) => {
        setSelectedTab(tab);
    }
    const gettrailers = () => {
        if (selectedTab === 'movie') {
            return latesttrailers;
        } else if (selectedTab === 'tv') {
            return latesttvtrailers;
        }
    }
    return (
        <div>
            {latesttrailers && latesttvtrailers && <div className="w-full mt-10 mx-auto xl:max-w-[100%]">
                <div className="w-full">
                    <div className="flex items-center gap-5 justify-between px-2 md:px-5 mb-4 md:mb-3">
                        <div className="flex flex-col gap-1 tracking-wide">
                            <div className="font-medium text-white uppercase md:capitalize flex items-center gap-2 md:tracking-wide w-full text-lg md:text-2xl flex-shrink-0">
                                <div className="h-[1.4rem] p-1 md:h-[1.5rem] flex items-center justify-center rounded bg-[#ffffff]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="black" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-star">
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                    </svg>
                                </div>
                                Top Rated
                            </div>
                            
                        </div>
                        <div className="flex gap-1 md:gap-2">
                            <button onClick={()=>handletabChange('movie')} 
                            className={selectedTab === 'movie' ? "rounded-md md:rounded-full w-[4.5rem] md:w-[7rem] p-[.4rem] bg-[#ffffff] text-black ring-[.025em] font-medium text-xs md:text-base transition-all ease-in duration-300" : "rounded-md md:rounded-full w-[4.5rem] md:w-[7rem] p-[.4rem] bg-transparent text-white ring-white/90 ring-[.025em] font-medium text-xs md:text-base"}>Movies</button>
                            <button onClick={()=>handletabChange('tv')} className={selectedTab === 'tv' ? "rounded-md md:rounded-full w-[4.5rem] md:w-[7rem] p-[.4rem] bg-[#ffffff] text-black ring-[.025em] font-medium text-xs md:text-base transition-all ease-in duration-300" : "rounded-md md:rounded-full w-[4.5rem] md:w-[7rem] p-[.4rem] bg-transparent text-white ring-white/90 ring-[.025em] font-medium text-xs md:text-base" }>Tv Shows</button>
                        </div>
                    </div>
                    <div className="w-full md:h-[480px] lg:h-[700px] 2xl:h-[750px] 3xl:h-[800px] relative rounded-2xl md:rounded-none xl:rounded-2xl bg-white/5">
                        <Swiper
                            modules={[FreeMode, Pagination,Autoplay , Keyboard]}
                            keyboard={true}
                            pagination
                            autoplay={{ delay: 4000,
                                disableOnInteraction: false,
                             }}
                            className="mySwiper  w-full h-full rounded-xl md:rounded-none xl:rounded-2xl overflow-hidden"
                        >
                            {latesttrailers && gettrailers()?.map((elements) => (
                                <SwiperSlide key={elements.id}>
                                    <div className="swiper-slide flex flex-col md:flex-row w-full relative md:p-10 xl:p-16" style={{ width: "100%", marginRight: "10px" }}>
                                        <div className="!absolute top-0 left-0 z-[-1] blur-3xl overflow-hidden w-full h-full lg:h-[700px] object-cover opacity-50">
                                            <LazyLoadImage
                                                src={`https://image.tmdb.org/t/p/w780/${elements.backdrop_path}`}
                                                effect="blur"
                                                className='w-full h-full object-cover object-center'
                                            />
                                        </div>
                                        <div className="w-full max-w-3xl text-white mx-auto md:w-1/2 lg:w-[45%] mr-auto tracking-wide p-5 pb-6 pt-3 sm:p-8 lg:pt-12 flex gap-2 lg:gap-4 flex-col">
                                            <div className="text-2xl lg:text-4xl !leading-tight font-semibold">{elements.name || elements.title}</div>
                                            <div className="text-xs flex gap-3">
                                                <span className="flex gap-[2px] items-center">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="12"
                                                        height="12"
                                                        viewBox="0 0 24 24"
                                                        fill="white"
                                                        stroke="currentColor"
                                                        stroke-width="2"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        className="lucide lucide-star"
                                                    >
                                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                                    </svg>
                                                    {elements.vote_average.toFixed(1)}
                                                </span>
                                                <span className="uppercase">{elements.media_type}</span><span>{elements.release_date || elements.first_air_date}</span><span className="uppercase">en</span><span>HD</span>
                                            </div>
                                            <div className="text-xs lg:text-sm text-gray-200 !italic line-clamp-3 lg:line-clamp-5">
                                                {elements.overview.substring(0, 200)}...
                                            </div>
                                            <div className="mt-3 flex gap-2 lg:gap-3">
                                                <a className="w-[9rem] md:w-[11rem] flex gap-1 items-center justify-center p-3 text-sm md:text-base text-black font-medium hover:brightness-[.8] bg-[#ffffff] rounded-full" href={selectedTab==="movie" ? `/${selectedTab}/watch/${elements.id}` : `/${selectedTab}/${elements.id}/1/1`}>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="20"
                                                        height="20"
                                                        viewBox="0 0 24 24"
                                                        fill="black"
                                                        stroke="currentColor"
                                                        stroke-width="2"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        className="lucide lucide-play"
                                                    >
                                                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                                    </svg>
                                                    Watch Now
                                                </a>
                                                <a className="w-[9rem] md:w-[11rem] flex gap-1 items-center justify-center p-3 text-sm md:text-base hover:bg-white/10 text-white font-medium bg-white/20 rounded-full" href={`/${selectedTab}/${elements.id}`}>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="20"
                                                        height="20"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        stroke-width="2"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        className="lucide lucide-info"
                                                    >
                                                        <circle cx="12" cy="12" r="10"></circle>
                                                        <path d="M12 16v-4"></path>
                                                        <path d="M12 8h.01"></path>
                                                    </svg>
                                                    Details
                                                </a>
                                            </div>
                                        </div>
                                        <div className="w-full max-w-3xl mx-auto order-first md:order-none md:w-[60%] h-[100%] md:p-5">
                                            <div className="w-full aspect-video sm:aspect-[16/10]  md:rounded-2xl  bg-white/5 relative group">
                                                <MovieHoverEffect elements={elements} />
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>))}

                        </Swiper>
                        <Swiper
                            modules={[FreeMode, Autoplay, Pagination, Keyboard]}
                            keyboard={true}
                            pagination
                            autoplay={{ delay: 4000,
                                disableOnInteraction: false,
                             }}
                            breakpoints={{
                                320: {
                                    slidesPerView: 2,
                                    spaceBetween: 5
                                },
                                480: {
                                    slidesPerView: 4,
                                    spaceBetween: 5
                                },
                                768: {
                                    slidesPerView: 6,
                                    spaceBetween: 5
                                },
    
                            }}
                            className="mySwiper smalll hidden md:block select-none w-full mt-[-140px] lg:mt-[-200px] pl-5 2xl:pl-0 2xl:w-[98%]"
                        >
                            {latesttrailers && gettrailers()?.map((elements) => (
                            <SwiperSlide key={elements.id}>
                                <div
                                    className="swiper-slide rounded-lg bg-white/5 aspect-[1/1.5] overflow-hidden select-none brightness-50 cursor-pointer active:scale-95 smoothie swiper-slide-visible swiper-slide-active"
                                    style={{ width: "100%", marginRight: "10px" }}
                                >
                                    <LazyLoadImage 
                                        src={`https://image.tmdb.org/t/p/w342/${elements.poster_path}`}
                                        className="object-cover w-full h-full"
                                        effect='blur'
                                    />
                                </div>
                            </SwiperSlide>))}
                        </Swiper>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default TopRated;