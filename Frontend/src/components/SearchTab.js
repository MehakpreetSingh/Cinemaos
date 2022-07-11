import React, { useEffect } from 'react'
import { useState } from 'react';
import MovieCard from './MovieCard';
import MovieCard2 from './MovieCard2';
import 'swiper/css';

const SearchTab = () => {
    return (
        <div>
            <>
                <div className='h-[2px] w-full z-[99999999] absolute top-[63px]'>
                    <div id="loading-bar" className='transition-all w-[0%] h-[2px] bg-red-800'>
                    </div>
                </div>
                <div className='bg-[#ffffff] absolute mt-[70px] pb-12'>
                    {/* <div className='flex justify-center items-center m-4 '>
        <ReactPlayer pip={true} controls={true} url='https://d1e65r3doj6e53.cloudfront.net/The Batman (2022) WEBDL-1080p 8bit h264 AAC 2.0 -CMRG.mp4' />
    </div> */}

                    {!loading && <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        {movies?.map((element, index) => {
                            return (
                                <div className='' key={index}>
                                    {/* <MovieCard movieData = {element} /> */}
                                    <MovieCard2 movieData={element} />
                                </div>
                            )
                        })}
                    </div>}
                </div>
            </>
        </div>
    )
}

export default SearchTab
