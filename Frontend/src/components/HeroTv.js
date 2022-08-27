import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import play from '../play.png'
import SeasonModal from './SeasonModal';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, EffectFade ,Mousewheel , Keyboard  } from 'swiper';
import { FreeMode } from 'swiper';
import 'swiper/css/free-mode';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const HeroTv = () => {
    const [info, setInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const [cast, setCast] = useState([]);
    const { id } = useParams();
    // const port = process.env.PORT || 5000 ;
    // const host =  `http://localhost:${port}/` ;
    // const dbData = async() => {
    //     const url = `${host}movies/getmovie/${id}` ;
    //     const response = await fetch(url , {
    //         method : "GET" ,
    //         header : {
    //             'Content-Type': 'application/json' 
    //         },
    //     });
    //     const data = await response.json();
    //     setDbinfo(data);
    // }
    const [open, setOpen] = useState(false);
    useEffect(() => {

        const getMovieData = async () => {
            const url = `https://api.themoviedb.org/3/tv/${id}?api_key=748d8f1491929887f482d9767de12ea8&language=en-US`;
            const response = await fetch(url);
            const data = await response.json();
            setInfo(data);
            const url2 = `https://api.themoviedb.org/3/tv/${id}/credits?api_key=748d8f1491929887f482d9767de12ea8&language=en-US`;
            const response2 = await fetch(url2);
            const data2 = await response2.json();
            setCast(data2.cast)
        }
        getMovieData();
        // dbData() ;
        var x = document.getElementById("loading-bar");
        for (let i = 0; i < 4; i++) {
            setTimeout(() => {
                x.classList.remove(`w-[${(i) * 25}%]`);
                x.classList.add(`w-[${(i + 1) * 25}%]`);
            },100);
        }
        x.classList.remove("w-[100%]");

        setTimeout(() => {
            setLoading(false);
        }, 350);
        setTimeout(() => {
            x.classList.add("w-0")
        }, 400);
        // eslint-disable-next-line
    }, [])
    const handleModalClick = (n) => {
        var x = document.getElementsByClassName("seasonmodalClick")[n];
        if (open) {
            x.classList.add("hidden");
            setOpen(!open);
        } else {
            x.classList.remove("hidden");
            setOpen(!open);
        }
    }
    return (
        <>
            <div className='h-[2px] w-full z-[99999999] absolute top-[63px]'>
                <div id="loading-bar" className='transition-all w-[0%] h-[2px] bg-red-800'>
                </div>
            </div>
            {!loading && <div className='relative h-64 md:h-[560px]'>
                <div className='absolute mt-10 md:overflow-hidden h-64 py-5 md:h-[500px] w-full '>
                    <img className='md:opacity-30 opacity-50 object-cover w-full h-64 md:h-[500px] object-center' src={`https://image.tmdb.org/t/p/w1280${info.backdrop_path}`} alt="" />
                </div>
                <div className="py-5 backdrop-div mt-10 absolute flex flex-col sm:flex-row" >
                    <div className='poster-img m-10 '>
                        <img className='rounded-lg h-40 md:h-96 object-cover' src={`https://image.tmdb.org/t/p/w500${info.poster_path}`} alt="" />
                    </div>
                    <div className='content my-10 md:block hidden w-2/3'>
                        <h1 className='text-black text-3xl font-bold'>{`${info.original_name}`}<span className='font-medium'>{`(${info.first_air_date?.substring(0, 4)})`}</span></h1>
                        <div className='flex items-center space-x-10'>
                            <p>{info.release_date}</p>
                            <p>{info.number_of_seasons} Seasons</p>
                        </div>

                        <div className='flex items-center space-x-4'>
                            <h1 className='rounded-full bg-yellow-400 pt-2 h-10 w-10 text-center align-middle'>{info.vote_average}</h1>
                            <div className='space-x-1 flex items-center hover:opacity-70'>
                                <img className='h-6' src={play} alt="" />
                                <a className='text-gray-800' href="?">Play Trailer</a>
                            </div>
                        </div>
                        <h1 className='text-gray-600 italic'>{info.tagline}</h1>
                        <h1 className='textblack text-xl font-medium'>Overview</h1>
                        <p>{info.overview}</p>
                        <a href="#seasons-div" className="mt-3 text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 mr-2 mb-2">
                            Check Out ALL The Seasons
                        </a>
                    </div>
                </div>

            </div>}
            <div className=' my-16 md:my-0 w-[94%] overflow-hidden mx-4 md:mx-10 font-sans font-medium'>
                    <h1>Series Cast</h1>
                    <div className='mt-2'>
                    <Swiper
                        freeMode={true}
                        grabCursor={true}
                        modules={[FreeMode, Navigation, Pagination,Mousewheel , Scrollbar, A11y, EffectFade , Keyboard ]}
                        keyboard={true}
                        navigation
                        height={400}
                        draggable={true}
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
                                spaceBetween: 30
                            },

                        }}
                    >
                        {
                            cast.map((element, index) => {
                                if(index < 15) {
                                    return (
                                        <SwiperSlide key={index}>
                                        <div class="max-w-[160px] h-[320px] rounded overflow-hidden shadow-lg">
                                            <img class="w-full " src={`https://image.tmdb.org/t/p/w500${element.profile_path}`} alt="Sunset in the mountains" />
                                            <div class="px-2 md:px-6 py-4">
                                                <div class="font-bold text-sm">{element.original_name}</div>
                                                <p class="text-gray-700 text-[10px]">
                                                   {element.character}
                                                </p>
                                            </div>
                                        </div>
                                        </SwiperSlide>
                                    )
                                }
                                
                            })
                        }
                    </Swiper>
                    </div>
                </div>
            {!loading && <div id="seasons-div" className='seasons-div md:my-4 flex flex-col justify-center items-center'>
                <h1 className='text-black text-2xl mb-4 border-y shadow w-5/6 text-center'>Total Seasons | {info.number_of_seasons}</h1>
                <div className='grid gap-2 grid-cols-1'>
                    {info?.seasons?.map((element, index) => {
                        return (
                            <div key={index}>
                                <div onClick={() => handleModalClick(index)} className="px-2 md:px-0 flex  items-center bg-white rounded-lg border shadow-md flex-row md:max-w-5xl  hover:bg-gray-100">
                                    <img className="object-cover w-auto h-40 rounded-t-lg md:h-auto md:w-32 md:rounded-none md:rounded-l-lg" src={`https://image.tmdb.org/t/p/w500${element.poster_path}`} alt="" />
                                    <div className="flex flex-col justify-between p-4 leading-normal">
                                        <h5 className="mb-2 text-lg md:text-2xl font-bold tracking-tight text-gray-900 ">{element.name}</h5>
                                        <p className="mb-3 text-base md:text-lg font-normal text-gray-700 dark:text-gray-400">{element.overview || info.overview}</p>
                                    </div>
                                </div>
                                <div id="seasonmodalClick" className='seasonmodalClick hidden fixed overflow-y-scroll z-[99999] top-0 bottom-0 right-0 left-0'>
                                    <SeasonModal modalindex={index} handleModalClick={handleModalClick} id={id} element={element} backdrop_path={info.backdrop_path} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>}
        </>
    )
}

export default HeroTv