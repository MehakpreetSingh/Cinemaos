import React, { useEffect } from 'react'
import { useState } from 'react';
import ReactPlayer from 'react-player'
import MovieCard from './MovieCard';
import MovieCard2 from './MovieCard2';
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from './Spinner';

const Tv = () => {
    const host = `https://cinemaos-backend.herokuapp.com/`;
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalpages, setTotalPages] = useState(0);
    useEffect(() => {
        // const getData = async () => {
        //     const url = `${host}series/allseries`;
        //     const response = await fetch(url, {
        //         method: 'GET',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //     });
        //     const data = await response.json();

        //     setMovies(data);

        // }
        // getData();
        const getPopulartv = async() => {
            const url = `https://api.themoviedb.org/3/tv/popular?api_key=748d8f1491929887f482d9767de12ea8&language=en-US&page=1` ;
            const response = await fetch(url) ;
            const data = await response.json() ;
            setMovies(data.results);
            setTotalPages(data.total_pages);
            setPage(page + 1) ;
        }
        getPopulartv() ;
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
        const url = `https://api.themoviedb.org/3/tv/popular?api_key=748d8f1491929887f482d9767de12ea8&language=en-US&page=${page}`;
        let response = await fetch(url);
        let data = await response.json();
        setMovies(movies.concat(data.results));
        setPage(page + 1);
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
                hasMore={page <= totalpages}
                loader={<Spinner />}
            >
            <div className='bg-[#ffffff] absolute mt-[70px]'>
                {/* <div className='flex justify-center items-center m-4 '>
      <ReactPlayer pip={true} controls={true} url='https://d1e65r3doj6e53.cloudfront.net/The Batman (2022) WEBDL-1080p 8bit h264 AAC 2.0 -CMRG.mp4' />
  </div> */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {movies?.map((element, index) => {
                        
                            return (
                                <div className='' key={index}>
                                    {/* <MovieCard movieData = {element} /> */}
                                    <MovieCard movieData={element} />
                                </div>
                            )


                    })}
                </div>
            </div>
            </InfiniteScroll>
        </>
    )
}

export default Tv