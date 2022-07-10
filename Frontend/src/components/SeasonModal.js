import { useEffect, useState } from "react"
import React from 'react'
import close from '../close.png'
import { Link } from "react-router-dom";

const SeasonModal = (props) => {
    const port = process.env.PORT || 5000 ;
    const host = `http://localhost:${port}/` ;
    const [seasonData, setSeasonData] = useState({})
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const getSeasonData = async (req, res) => {
            const url = `https://api.themoviedb.org/3/tv/${props.id}/season/${props.element.season_number}?api_key=748d8f1491929887f482d9767de12ea8&language=en-US`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data)
            setSeasonData(data);
        }
        getSeasonData();
        setLoading(false);
    }, [])

    return (
        <div className='p-12  bg-transparent'>
            
            <div className='rounded-xl relative border shadow-sm bg-white'>
            <div onClick={()=>props.handleModalClick(props.modalindex)} className="cursor-pointer absolute top-4 right-4">
                <img src={close} alt="" />
            </div>
                <div className='rounded-xl border px-4 bg-white flex flex-col md:flex-row items-center '>
                    <div className='m-10'>
                        <img className='h-52 rounded-md object-cover' src={`https://image.tmdb.org/t/p/original${props.element.poster_path}`} alt="" />
                    </div>
                    <div className='content my-12 w-2/3'>
                        <h1 className='text-black text-3xl font-bold'>{`${props.element.name}`}<span className='font-medium'>{`(${props.element.air_date?.substring(0, 4)})`}</span></h1>
                        <div className='flex items-center space-x-10'>
                            <p>{props.element.air_date}</p>
                            <p>{props.element.episode_count} Episodes</p>
                        </div>
                        <h1 className='textblack text-xl font-medium'>Overview</h1>
                        <p>{props.element.overview}</p>
                    </div>
                </div>
                <div className=' flex flex-col'>
                    <h1 className='my-1 mx-10 text-xl font-medium'>Episodes <span className='font-normal'>{props.element.episode_count}</span> </h1>
                    <div className=' grid grid-cols-1 gap-4'>
                        {seasonData?.episodes?.map((element, index) => {
                            if (loading === false) {
                                return (

                                    <div className="" key={index}>
                                        <Link to={`/series/${props.id}/${element.season_number}/${element.episode_number}`} className="mx-auto flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row w-[95%] hover:bg-gray-100 ">
                            
                                                <img className="object-cover mx-2 w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={`https://image.tmdb.org/t/p/original${element.still_path}`} alt="" />
                                                <a href=""></a>
                                            
                                            <div className="flex flex-col justify-between p-4 leading-normal">
                                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 "><span>{element.episode_number}.</span>{element?.name}</h5>
                                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-600">{element?.overview}</p>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            }

                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SeasonModal