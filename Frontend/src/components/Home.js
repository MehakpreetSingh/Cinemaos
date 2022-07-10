import React,{useEffect} from 'react'
import { useState } from 'react';
import ReactPlayer from 'react-player'
import MovieCard from './MovieCard';
import MovieCard2 from './MovieCard2';

const Home = () => {
    const host =  `https://cinemaos-backend.herokuapp.com/` ;  ;
    const [movies , setMovies] = useState([]);
    const [loading , setLoading] = useState(true);
    useEffect(() => {
        const getData= async() => {
            const url = `${host}movies/allposts` ;
            const response = await fetch(url , {
                method: 'GET', 
                headers: {
                    'Content-Type': 'application/json' ,
                },
            });
            const data = await response.json() ;
            
            setMovies(data) ; 
       
        }
        getData() ;
        setLoading(false) ;
    }, [])
    
  return (
    <div className='bg-[#ffffff] absolute mt-[90px]'>
        {/* <div className='flex justify-center items-center m-4 '>
        <ReactPlayer pip={true} controls={true} url='https://d1e65r3doj6e53.cloudfront.net/The Batman (2022) WEBDL-1080p 8bit h264 AAC 2.0 -CMRG.mp4' />
    </div> */}
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {movies?.map((element , index) => {
            if(loading === false) {
                return (
                    <div className='' key={index}>
                        {/* <MovieCard movieData = {element} /> */}
                        <MovieCard2 movieData={element}/>
                    </div>
                )
            }
            
        } ) }
    </div>
    </div>
  )
}

export default Home