import React, { useEffect } from 'react'
import { useState } from 'react';
import MovieCard from './MovieCard';
import MovieCard2 from './MovieCard2';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from './Spinner';

const Movie = (props) => {
    const [movies, setMovies] = useState(null);
    const [page, setPage] = useState(2);
    const [totalpages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [url, seturl] = useState(`https://api.themoviedb.org/3/movie/popular?api_key=748d8f1491929887f482d9767de12ea8&language=en-US`)
    useEffect(() => {
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
        // getData() ;
        const getPopularmovies = async () => {
            let url2 = url;
            if (props.category === "trending") {
                url2 = `https://api.themoviedb.org/3/trending/movie/week?api_key=748d8f1491929887f482d9767de12ea8`
            }
            const response = await fetch(url2);
            const data = await response.json();
            setMovies(data.results)
            setTotalPages(data.total_pages);
            setPage(page + 1);
        }
        getPopularmovies();
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
        }, 300);
        setTimeout(() => {
            x.classList.add("w-0")
        }, 450);
    }, [])
    const fetchMoreData = async () => {
        console.log("More printed")
        let url2 = url.concat(`&page=${page}`);
        if (props.category === "trending") {
            url2 = `https://api.themoviedb.org/3/trending/movie/week?api_key=748d8f1491929887f482d9767de12ea8&page=${page}`
        }
        let response = await fetch(url2);
        let data = await response.json();
        const appendedData = movies.concat(data.results);
        console.log(appendedData);
        setMovies(appendedData);
        setPage(page + 1);
    };

    return (
        <div className=' relative h-screen ' >
            <div className='h-[2px] w-full z-[99999999] absolute'>
                <div id="loading-bar" className='transition-all w-[0%] h-[2px] bg-red-800'>
                </div>
            </div>
            {loading && (movies===null) && <div className='flex h-full w-full justify-center items-center'><Spinner/></div>}
            {!loading && movies && <InfiniteScroll
                dataLength={movies?.length}
                next={fetchMoreData}
                hasMore={page <= totalpages}
            >
                <div className='bg-[#000000] mt-[100px] absolute w-full px-4 mx-auto pb-12'>
                    {!loading && <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4'>
                        {movies?.map((element, index) => {
                            return (
                                <MovieCard2 key={index} movieData={element} />
                            )
                        })}
                    </div>}
                </div>
            </InfiniteScroll>}
        </div>
    )
}

export default Movie