import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import play from '../play.png'

const HeroMovie = () => {
    const [info, setInfo] = useState({});
    const [dbinfo, setDbinfo] = useState({});
    const [loading, setLoading] = useState(true);
    const {id} = useParams() ;
    useEffect(() => {

        const getMovieData = async () => {
            const url = `https://api.themoviedb.org/3/movie/${id}?api_key=748d8f1491929887f482d9767de12ea8&language=en-US`;
            const response = await fetch(url);
            const data = await response.json();
            setInfo(data);

        }
        getMovieData();
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
    return (
        <>
            <div className='h-[2px] w-full z-[99999999] absolute top-[63px]'>
                <div id="loading-bar" className='transition-all w-[0%] h-[2px] bg-red-800'>
                </div>
            </div>
            {!loading && <div>
                <div className='absolute mt-10 overflow-hidden py-5 h-[500px] w-full '>
                    <img className='opacity-30 object-cover w-full h-[500px] object-center' src={`https://image.tmdb.org/t/p/original${info.backdrop_path}`} alt="" />
                </div>
                <div className="py-5 backdrop-div mt-10 absolute flex flex-col sm:flex-row" >
                    <div className='poster-img m-10 '>
                        <img className='rounded-lg h-96 object-cover' src={`https://image.tmdb.org/t/p/original${info.poster_path}`} alt="" />
                    </div>
                    <div className='content my-10 mx-4 shadow-lg rounded-lg sm:rounded-none sm:shadow-none sm:mx-0 sm:w-2/3'>
                        <h1 className='text-black text-3xl font-bold'>{`${info.original_title}`}<span className='font-medium'>{`(${info.release_date?.substring(0, 4)})`}</span></h1>
                        <div className='flex items-center space-x-10'>
                            <p>{info.release_date}</p>
                            <p>{info.runtime} min</p>
                        </div>

                        <div className='flex items-center space-x-4'>
                            <h1 className='rounded-full bg-yellow-400 pt-2 h-10 w-10 text-center align-middle'>{info.vote_average}</h1>
                            <div className='space-x-1 flex items-center hover:opacity-70'>
                                <img className='h-6' src={play} alt="" />
                                <a className='text-gray-800' href="">Play Trailer</a>
                            </div>
                        </div>
                        <h1 className='text-gray-600 italic'>{info.tagline}</h1>
                        <h1 className='textblack text-xl font-medium'>Overview</h1>
                        <p>{info.overview}</p>
                        <Link to={`/movie/watch/${info.id}`} className="mt-3 text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 mr-2 mb-2">
                            Watch Now
                        </Link>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default HeroMovie