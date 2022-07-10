import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import play from '../play.png'
import SeasonModal from './SeasonModal';

const HeroTv = () => {
    const [info, setInfo] = useState({});
    const [dbinfo, setDbinfo] = useState({});
    const [loading, setLoading] = useState(true);
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
    const [open , setOpen] = useState(false) ;
    useEffect(() => {
        
        const getMovieData = async () => {
            const url = `https://api.themoviedb.org/3/tv/${id}?api_key=748d8f1491929887f482d9767de12ea8&language=en-US`;
            const response = await fetch(url);
            const data = await response.json();
            setInfo(data);
            setLoading(false);
        }
        getMovieData();
        // dbData() ;
    }, [])
    const handleModalClick = (n) => {
        var x = document.getElementsByClassName("seasonmodalClick")[n] ;
        if(open) {
            x.classList.add("hidden") ;
            setOpen(!open);
        }else {
            x.classList.remove("hidden") ;
            setOpen(!open);
        }
    }
    return (
        <>
            {!loading && <div className='relative h-[560px]'>
                <div className='absolute mt-10 overflow-hidden py-5 h-[500px] w-full '>
                    <img className='opacity-30 object-cover w-full h-[500px] object-center' src={`https://image.tmdb.org/t/p/original${info.backdrop_path}`} alt="" />
                </div>
                <div className="py-5 backdrop-div mt-10 absolute flex flex-col sm:flex-row" >
                    <div className='poster-img m-10 '>
                        <img className='rounded-lg h-96 object-cover' src={`https://image.tmdb.org/t/p/original${info.poster_path}`} alt="" />
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
                                <a className='text-gray-800' href="">Play Trailer</a>
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
            <div id="seasons-div" className='seasons-div flex flex-col justify-center items-center'>
                <h1 className='text-black text-2xl mb-4 border-y shadow w-5/6 text-center'>Total Seasons {info.number_of_seasons}</h1>
                <div className='grid gap-2 grid-cols-1'>
                    {info?.seasons?.map((element, index) => {
                        return (
                            <div key={index}>
                                <div onClick={()=>handleModalClick(index)} className="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-5xl  hover:bg-gray-100">
                                    <img className="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={`https://image.tmdb.org/t/p/original${element.poster_path}`} alt=""/>
                                        <div className="flex flex-col justify-between p-4 leading-normal">
                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{element.name}</h5>
                                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{element.overview || info.overview}</p>
                                        </div>
                                </div>
                                <div id="seasonmodalClick" className='seasonmodalClick hidden fixed overflow-y-scroll z-[99999] top-0 bottom-0 right-0 left-0'>
                                    <SeasonModal modalindex = {index} handleModalClick={handleModalClick} id={id} element = {element} /> 
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default HeroTv