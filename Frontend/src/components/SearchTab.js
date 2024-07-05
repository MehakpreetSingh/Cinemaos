import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams , Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import 'swiper/css';
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from './Spinner';
import MovieCard from './MovieCard';

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
    };
    return (
            <div className='relative h-screen' >
                <div className='h-[2px] w-full z-[99999999] absolute'>
                    <div id="loading-bar" className='transition-all w-[0%] h-[2px] bg-red-800'>
                    </div>
                </div>
                {loading && <div className='flex h-full w-full justify-center items-center'><Spinner/></div>}
            {loading && <div className='flex h-full w-full justify-center items-center'><Spinner/></div>}
                {!loading && <InfiniteScroll
                dataLength={movies?.length}
                next={fetchMoreData}
                hasMore={page !== totalpages}
            >
                <div className='bg-[#000000] absolute mt-[100px] px-6 w-full mx-auto pb-12'>
                    {/* <div className='flex justify-center items-center m-4 '>
        <ReactPlayer pip={true} controls={true} url='https://d1e65r3doj6e53.cloudfront.net/The Batman (2022) WEBDL-1080p 8bit h264 AAC 2.0 -CMRG.mp4' />
    </div> */}

                    {!loading && <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4'>
                        {movies?.map((element, index) => {
                            if (element.media_type != "person") {

                                return (
                                    <MovieCard key={index} movieData={element}/>
                                )
                            }
                        })}
                    </div>}
                </div>
                </InfiniteScroll>}
            </div>
    )
}

export default SearchTab
