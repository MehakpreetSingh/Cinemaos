import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { useParams } from 'react-router-dom';


const WatchTv = () => {
    const [dbData, setDbData] = useState({});
    const [loading, setLoading] = useState(true);
    const [episodeData, setEpisodeData] = useState({});
    const { id, S, E } = useParams();
    useEffect(() => {
        const host = `https://cinemaos-backend.herokuapp.com/`;
        const getEpisodeAPIData = async () => {
            const url = `https://api.themoviedb.org/3/tv/${id}/season/${S}/episode/${E}?api_key=748d8f1491929887f482d9767de12ea8&language=en-US`
            const response = await fetch(url);
            const data = await response.json();
            setEpisodeData(data);
        }
        const getEpisodeData = async () => {
            const url = `${host}tvshows/getepisode/${id}/${S}/${E}`;
            const response = await fetch(url, {
                method: "GET",
                header: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json();

            if (data.success) {
                setDbData(data.getpost);
            }
            else {

            }
            setLoading(false);
        }
        getEpisodeData();
        getEpisodeAPIData();
        var x = document.getElementById("loading-bar");
        for (let i = 0; i < 4; i++) {
            setTimeout(() => {
                x.classList.remove(`w-[${(i) * 25}%]`);
                x.classList.add(`w-[${(i + 1) * 25}%]`);
            }, 300);
        }
        x.classList.remove("w-[100%]");

        setTimeout(() => {
            setLoading(false);
        }, 1150);
        setTimeout(() => {
            x.classList.add("w-0")
        }, 1200);
    }, [])
    return (
        <>
            <div className='h-[2px] w-full z-[99999999] absolute top-[63px]'>
                <div id="loading-bar" className='transition-all w-[0%] h-[2px] bg-red-800'>
                </div>
            </div>
            {!loading && <div className='h-screen w-screen flex justify-center items-center'>
                <div className='hidden md:inline-block'>
                    <div class="max-w-sm bg-white border-t border-l border-b ">

                        <img class="" src={`https://image.tmdb.org/t/p/original${episodeData?.still_path}`} alt="" />

                        <div class="p-5">

                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{episodeData?.name}</h5>

                            <p class="mb-3 font-normal text-gray-700 h-[52px] overflow-hidden">{episodeData?.overview}</p>
                            <a className='hidden md:inline-block px-4 py-2 m-1 bg-amber-500 text-white rounded-lg' href={`${dbData?.url}`} download>Download</a>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    
                        <ReactPlayer url={`${dbData?.url}`} controls={true} />
                    
                        <a className='px-4 py-2 m-4 bg-amber-500 text-white rounded-lg' href={`${dbData?.url}`} download>Download</a>
                    
                </div>

            </div>}
        </>
    )
}

export default WatchTv