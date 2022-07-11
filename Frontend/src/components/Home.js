import React, { useEffect } from 'react'
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, EffectFade } from 'swiper';
import { FreeMode } from 'swiper';
import 'swiper/css/free-mode';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import TrendCard from './TrendCard';
import home from '../bg-home.png'
import { Link , useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate= useNavigate();
    const host = `https://cinemaos-backend.herokuapp.com/`;;
    const [movies, setMovies] = useState([]);
    const [tvshows, setTvShows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchquery, setSearchQuery] = useState("");
    useEffect(() => {
        const gettmdbData = async () => {
            const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=748d8f1491929887f482d9767de12ea8`;
            const response = await fetch(url);
            const data = await response.json();
            setMovies(data);
        }
        const gettmdbtvData = async () => {
            const url = `https://api.themoviedb.org/3/trending/tv/week?api_key=748d8f1491929887f482d9767de12ea8`;
            const response = await fetch(url);
            const data = await response.json();
            setTvShows(data);
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
        gettmdbData();
        gettmdbtvData();
        // getData() ;
        var x = document.getElementById("loading-bar");
        for (let i = 0; i < 4; i++) {
            setTimeout(() => {
                x.classList.remove(`w-[${(i) * 25}%]`);
                x.classList.add(`w-[${(i + 1) * 25}%]`);
            }, 80);
        }
        x.classList.remove("w-[100%]");

        setTimeout(() => {
            setLoading(false);
        }, 250);
        setTimeout(() => {
            x.classList.add("w-0")
        }, 300);

    }, [])
    const handleSubmit = (e) => {
        e.preventDefault() ;
        navigate(`/search/${searchquery}`) ;
    }

    return (
        <>
            <div className='h-[2px] w-full z-[99999999] absolute top-[63px]'>
                <div id="loading-bar" className='transition-all w-[0%] h-[2px] bg-red-800'>
                </div>
            </div>
            <img className='absolute z-[999] w-full h-96 object-cover  top-16' src={home} alt="" />
            <form onSubmit={handleSubmit} className='absolute z-[9999] mt-[350px] w-full  '>
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
                <div className="relative mx-4 md:w-4/6 md:mx-auto">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <input type="search" id="default-search" className="block p-3 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:shadow-lg outline-none" onChange={(e)=> {setSearchQuery(e.target.value)}} placeholder="Search Movies & TV Shows" required/>
                        <Link to={`search/${searchquery}`} type="submit" onClick={handleSubmit} className="text-white absolute right-1.5 bottom-1.5 bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 ">Search</Link>
                </div>
            </form>

            {!loading && <div className='bg-[#ffffff] absolute px-4 mt-[420px] pb-12 w-[100%]'>
                <h1 className='mt-10 mx-4 text-black font-medium md:text-xl'>Trending Movies</h1>
                <div className='mx-2'>
                    <Swiper
                        freeMode={true}
                        grabCursor={true}
                        modules={[FreeMode, Navigation, Pagination, Scrollbar, A11y, EffectFade]}
                        navigation
                        height={400}
                        pagination={{ clickable: true }}
                        className="mySwiper px-2"
                        breakpoints={{
                            320: {
                                slidesPerView: 2,
                                spaceBetween: 20
                            },
                            480: {
                                slidesPerView: 4,
                                spaceBetween: 30
                            },
                            768: {
                                slidesPerView: 6,
                                spaceBetween: 40
                            },

                        }}
                    >

                        {movies?.results?.map((element, index) => {

                            if (loading === false) {
                                return (
                                    <SwiperSlide key={index}>
                                        <div className='' key={index}>
                                            <TrendCard movieData={element} />
                                        </div>
                                    </SwiperSlide>
                                )
                            }

                        })}


                    </Swiper>
                </div>
                <h1 className='mt-10 mx-4 text-black font-medium md:text-xl'>Trending TV Shows</h1>
                <div className='mx-2'>
                    <Swiper
                        freeMode={true}
                        grabCursor={true}
                        modules={[FreeMode, Navigation, Pagination, Scrollbar, A11y, EffectFade]}
                        navigation
                        pagination={{ clickable: true }}
                        className="mySwiper px-2"
                        breakpoints={{
                            320: {
                                slidesPerView: 2,
                                spaceBetween: 20
                            },
                            480: {
                                slidesPerView: 4,
                                spaceBetween: 30
                            },
                            768: {
                                slidesPerView: 6,
                                spaceBetween: 40
                            },

                        }}
                    >

                        {tvshows?.results?.map((element, index) => {

                            if (loading === false) {
                                return (
                                    <SwiperSlide key={index}>
                                        <div className='' key={index}>
                                            <TrendCard movieData={element} />
                                        </div>
                                    </SwiperSlide>
                                )
                            }

                        })}


                    </Swiper>
                </div>
            </div>}
        </>
    )
}

export default Home