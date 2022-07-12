import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams , Link } from 'react-router-dom';

import 'swiper/css';
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from './Spinner';

const SearchTab = () => {
    const { query } = useParams();
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalpages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    
    useEffect(()=> {
        const getData = async () => {
            const url = `https://api.themoviedb.org/3/search/multi?api_key=748d8f1491929887f482d9767de12ea8&language=en-US&query=${query}&page=1&include_adult=false`;
            const response = await fetch(url);
            const data = await response.json();
            setMovies(data.results);
            setTotalPages(data.total_pages);
            setPage(page + 1) ;
            console.log(data.results)
        }
        getData() ;
        var x = document.getElementById("loading-bar");
        for (let i = 0; i < 4; i++) {
            setTimeout(() => {
                x.classList.remove(`w-[${(i) * 25}%]`);
                x.classList.add(`w-[${(i + 1) * 25}%]`);
            }, 50);
        }
        x.classList.remove("w-[100%]");

        setTimeout(() => {
            setLoading(false);
        }, 200);
        setTimeout(() => {
            x.classList.add("w-0")
        }, 200);
        // eslint-disable-next-line
    },[query])
    // eslint-disable-next-line
    const fetchMoreData = async () => {
        const url = `https://api.themoviedb.org/3/search/multi?api_key=748d8f1491929887f482d9767de12ea8&language=en-US&query=${query}&page=${page}&include_adult=false`;
        let response = await fetch(url);
        let data = await response.json();
        setMovies(movies.concat(data.results));
        setPage(page + 1);
        console.log(data.results)
    };
    return (
            <>
                <div className='h-[2px] w-full z-[99999999] absolute top-[63px]'>
                    <div id="loading-bar" className='transition-all w-[0%] h-[2px] bg-red-800'>
                    </div>
                </div>
                <InfiniteScroll
                dataLength={movies?.length}
                next={fetchMoreData}
                hasMore={page !== totalpages}
                loader={<Spinner />}
            >
                <div className='bg-[#ffffff] absolute mt-[70px] pb-12'>
                    {/* <div className='flex justify-center items-center m-4 '>
        <ReactPlayer pip={true} controls={true} url='https://d1e65r3doj6e53.cloudfront.net/The Batman (2022) WEBDL-1080p 8bit h264 AAC 2.0 -CMRG.mp4' />
    </div> */}

                    {!loading && <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        {movies?.map((element, index) => {
                            return (
                                <div className='' key={index}>
                                    {/* <MovieCard movieData = {element} /> */}
                                     <div className=" py-6 flex flex-col justify-center sm:py-12">

                                        <div className="py-3 sm:max-w-xl sm:mx-auto">
                                            <div className="bg-white shadow-lg border-gray-100 max-h-80	 border sm:rounded-3xl p-8 flex space-x-8">
                                                <Link to={element.media_type === "movie" ? `/movie/${element.id}` : `/tv/${element.id}`} className="h-48 overflow-visible w-1/2 hover:scale-[1.1] transition-transform duration-150">
                                                    <img className="rounded-3xl shadow-lg" src={`https://image.tmdb.org/t/p/original${element.poster_path}`} alt="" />
                                                </Link>
                                                <div className="flex flex-col w-1/2 space-y-4">
                                                    <div className="flex justify-between items-start">
                                                        <Link to={element.media_type === "movie" ? `/movie/${element.id}` : `/tv/${element.id}`} className="text-3xl font-bold  hover:text-yellow-600">{element.name || element.original_title}</Link>
                                                        <div className="bg-yellow-400 font-bold rounded-xl p-2">{element.vote_average}</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-sm text-gray-400">{element.media_type === "movie" ? "Movie" : "Tv Series"}</div>
                                                        <div className="text-sm text-gray-800">{element.first_air_date}</div>
                                                    </div>
                                                    <p className=" text-gray-400 max-h-40 overflow-y-hidden">{element.overview}</p>

                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            )
                        })}
                    </div>}
                </div>
                </InfiniteScroll>
            </>
    )
}

export default SearchTab
